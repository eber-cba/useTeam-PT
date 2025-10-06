import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tarea } from './tareas.schema';

@Injectable()
export class TareasService {
  constructor(@InjectModel(Tarea.name) private tareaModel: Model<Tarea>) {}

  findAll() {
    return this.tareaModel.find().exec();
  }

  create(createDto: Partial<Tarea>) {
    const created = new this.tareaModel(createDto);
    return created.save();
  }

  update(id: string, updateDto: Partial<Tarea>) {
    return this.tareaModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  delete(id: string) {
    return this.tareaModel.findByIdAndDelete(id).exec();
  }
}
