import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tarea } from './tareas.schema';

interface TareaConTempId extends Partial<Tarea> {
  clientTempId?: string;
}

@Injectable()
export class TareasService {
  constructor(@InjectModel(Tarea.name) private tareaModel: Model<Tarea>) {}

  async findAll() {
    try {
      console.log('🔍 Buscando todas las tareas en la base de datos...');
      const tareas = await this.tareaModel.find().sort({ orden: 1 }).exec();
      console.log(`📋 Encontradas ${tareas.length} tareas en la base de datos`);
      console.log(
        '📋 Tareas encontradas:',
        tareas.map((t) => ({
          id: t._id,
          titulo: t.titulo,
          columna: t.columna,
        })),
      );
      return tareas;
    } catch (error) {
      console.error('❌ Error al buscar tareas:', error);
      throw error;
    }
  }

  async create(createTareaDto: Partial<Tarea>): Promise<TareaConTempId> {
    console.log('📝 Datos recibidos para crear tarea:', createTareaDto);

    // Eliminar _id temporal si existe
    if (createTareaDto._id) {
      delete createTareaDto._id;
    }

    const createdTarea = new this.tareaModel(createTareaDto);
    const savedTarea = await createdTarea.save();

    if (!savedTarea) {
      throw new Error('Error al guardar la tarea en la base de datos.');
    }

    console.log('✅ Tarea guardada en la base de datos:', savedTarea);

    const savedObject = savedTarea.toObject?.() ?? (savedTarea as any);

    const response: TareaConTempId = {
      ...savedObject,
      clientTempId: createTareaDto.clientTempId,
    };

    console.log('📤 Respuesta enviada al cliente:', response);

    return response;
  }

  update(id: string, updateDto: Partial<Tarea>) {
    const data: any = { ...updateDto };
    if (updateDto.lastEditedBy) data.lastEditedBy = updateDto.lastEditedBy;
    data.lastEditedAt = new Date();
    return this.tareaModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string) {
    return this.tareaModel.findByIdAndDelete(id).exec();
  }

  remove(id: string) {
    return this.tareaModel.findByIdAndDelete(id).exec();
  }

  async updateTaskColumn(taskId: string, newColumna: string, order?: number) {
    const updateData: any = { columna: newColumna };
    if (order !== undefined) updateData.orden = order;

    return this.tareaModel
      .findByIdAndUpdate(taskId, updateData, { new: true })
      .exec();
  }

  // NUEVO: Método para actualizar el nombre de columna en todas las tareas
  async updateColumnNameInTasks(oldColumnId: string, newColumnId: string) {
    console.log(
      `🔄 Actualizando tareas de columna ${oldColumnId} a ${newColumnId}`,
    );

    try {
      const result = await this.tareaModel
        .updateMany(
          { columna: oldColumnId },
          { $set: { columna: newColumnId } },
        )
        .exec();

      console.log(`✅ ${result.modifiedCount} tareas actualizadas`);
      return result;
    } catch (error) {
      console.error(
        '❌ Error actualizando nombres de columna en tareas:',
        error,
      );
      throw error;
    }
  }

  async exportAndEmail(userEmail: string, userName: string) {
    try {
      const n8nWebhookUrl =
        process.env.N8N_WEBHOOK_URL ||
        'http://localhost:5678/webhook/kanban-export';

      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
          userName,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en n8n: ${response.statusText}`);
      }

      const result = await response.json();

      return {
        success: true,
        emailSent: true,
        n8nProcessed: true,
        message: 'Exportación procesada por n8n',
      };
    } catch (error: any) {
      console.error('Error en exportAndEmail:', error);
      return {
        success: false,
        error: error?.message || 'Error desconocido',
      };
    }
  }
}
