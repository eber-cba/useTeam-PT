import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from './columns.schema';
import { TareasGateway } from '../tasks/tareas.gateway';
import { TareasService } from '../tasks/tareas.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<Column>,
    private readonly tareasGateway: TareasGateway,
    @Inject(forwardRef(() => TareasService))
    private readonly tareasService: TareasService,
  ) {}

  async findAll() {
    const cols = await this.columnModel.find().sort({ order: 1 }).lean().exec();
    if (!cols || cols.length === 0) {
      console.log('⚠️ No hay columnas, creando columnas por defecto');
      // Seed defaults
      const defaults = [
        { name: 'Por hacer', order: 0, createdBy: 'Sistema' },
        { name: 'En progreso', order: 1, createdBy: 'Sistema' },
        { name: 'Hecho', order: 2, createdBy: 'Sistema' },
      ];
      await this.columnModel.insertMany(defaults);
      return this.columnModel.find().sort({ order: 1 }).lean().exec();
    }
    console.log(`📊 Encontradas ${cols.length} columnas`);
    return cols;
  }

  async create(name: string, createdBy: string) {
    console.log(`📝 [Service] Creando columna: ${name} por ${createdBy}`);

    // Obtener el orden máximo actual
    const maxOrderCol = await this.columnModel
      .findOne()
      .sort({ order: -1 })
      .lean()
      .exec();

    const newOrder = maxOrderCol ? (maxOrderCol.order || 0) + 1 : 0;

    const created = await this.columnModel.create({
      name,
      createdBy,
      order: newOrder,
    });

    console.log(`✅ [Service] Columna creada:`, created);

    // Emit to websocket room about new column
    try {
      this.tareasGateway.emitColumnUpdate('column-created', {
        column: created.toObject ? created.toObject() : created,
      });
    } catch (e) {
      console.error('❌ Error emitiendo column-created:', e);
    }

    return created;
  }

  async update(id: string, patch: Partial<Column> | any) {
    console.log(`✏️ [Service] Actualizando columna ${id}:`, patch);

    // Si estamos cambiando el nombre, obtener el antiguo primero
    const oldColumn = await this.columnModel.findById(id).lean().exec();

    const updated = await this.columnModel
      .findByIdAndUpdate(id, patch, { new: true })
      .lean()
      .exec();

    if (!updated) {
      console.error(`❌ Columna ${id} no encontrada`);
      return null;
    }

    console.log(`✅ [Service] Columna actualizada:`, updated);

    // Si el nombre cambió, actualizar todas las tareas que usan esta columna
    if (patch.name && oldColumn && oldColumn.name !== patch.name) {
      console.log(
        `🔄 Renombrando columna en tareas: "${oldColumn.name}" -> "${patch.name}"`,
      );
      try {
        // Las tareas guardan el ID de la columna, no el nombre
        // Pero por compatibilidad, actualizamos por si acaso
        await this.tareasService.updateColumnNameInTasks(id, id);
      } catch (e) {
        console.error(
          '❌ Error actualizando tareas tras renombrar columna:',
          e,
        );
      }
    }

    try {
      this.tareasGateway.emitColumnUpdate('column-updated', {
        column: updated,
        oldName: oldColumn?.name, // Para que el frontend pueda actualizar tareas si es necesario
      });
    } catch (e) {
      console.error('❌ Error emitiendo column-updated:', e);
    }

    return updated;
  }

  async remove(id: string) {
    console.log(`🗑️ [Service] Eliminando columna ${id}`);

    const removed = await this.columnModel.findByIdAndDelete(id).lean().exec();

    if (!removed) {
      console.error(`❌ Columna ${id} no encontrada`);
      return null;
    }

    console.log(`✅ [Service] Columna eliminada:`, removed);

    try {
      this.tareasGateway.emitColumnUpdate('column-removed', {
        column: removed,
      });
    } catch (e) {
      console.error('❌ Error emitiendo column-removed:', e);
    }

    return removed;
  }

  // Método para reordenar columnas
  async reorderColumns(columns: any[]) {
    console.log(`🔄 [Service] Reordenando ${columns.length} columnas`);

    try {
      // Actualizar el orden de cada columna en la base de datos
      const updatePromises = columns.map((col, index) => {
        const id = col._id || col.id;
        if (!id) {
          console.error('❌ Columna sin ID:', col);
          return null;
        }

        console.log(`  - Actualizando columna ${col.name} a orden ${index}`);
        return this.columnModel
          .findByIdAndUpdate(id, { order: index }, { new: true })
          .lean()
          .exec();
      });

      const results = await Promise.all(updatePromises.filter(Boolean));

      console.log(
        `✅ [Service] ${results.length} columnas reordenadas exitosamente`,
      );

      // Emitir evento WebSocket
      try {
        this.tareasGateway.emitColumnUpdate('column-reordered', {
          columns: results,
        });
      } catch (e) {
        console.error('❌ Error emitiendo column-reordered:', e);
      }

      return results;
    } catch (error) {
      console.error('❌ Error reordenando columnas:', error);
      throw error;
    }
  }
}
