import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Column } from './columns.schema';
import { TareasGateway } from '../tasks/tareas.gateway';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectModel(Column.name) private columnModel: Model<Column>,
    private readonly tareasGateway: TareasGateway,
  ) {}

  async findAll() {
    const cols = await this.columnModel.find().sort({ order: 1 }).lean().exec();
    if (!cols || cols.length === 0) {
      // Seed defaults
      const defaults = [
        { name: 'Por hacer', order: 0 },
        { name: 'En progreso', order: 1 },
        { name: 'Hecho', order: 2 },
      ];
      await this.columnModel.insertMany(defaults);
      return this.columnModel.find().sort({ order: 1 }).lean().exec();
    }
    return cols;
  }

  async create(name: string) {
    const created = await this.columnModel.create({ name });
    // Emit to websocket room about new column
    try {
      this.tareasGateway.emitTaskUpdate('column-created', { column: created });
    } catch (e) {
      console.error('Error emitiendo column-created:', e);
    }
    return created;
  }

  async update(id: string, patch: Partial<Column> | any) {
    const updated = await this.columnModel
      .findByIdAndUpdate(id, patch, { new: true })
      .lean()
      .exec();
    try {
      this.tareasGateway.emitTaskUpdate('column-updated', { column: updated });
    } catch (e) {
      console.error('Error emitiendo column-updated:', e);
    }
    return updated;
  }

  async remove(id: string) {
    const removed = await this.columnModel.findByIdAndDelete(id).lean().exec();
    try {
      this.tareasGateway.emitTaskUpdate('column-removed', { column: removed });
    } catch (e) {
      console.error('Error emitiendo column-removed:', e);
    }
    return removed;
  }
}
