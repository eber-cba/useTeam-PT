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

  findAll() {
    return this.tareaModel.find().exec();
  }

  async create(createTareaDto: Partial<Tarea>): Promise<TareaConTempId> {
    console.log('Datos recibidos para crear tarea:', createTareaDto);

    // Eliminar _id temporal si existe
    if (createTareaDto._id) {
      delete createTareaDto._id;
    }

    const createdTarea = new this.tareaModel(createTareaDto);
    const savedTarea = await createdTarea.save();

    if (!savedTarea) {
      throw new Error('Error al guardar la tarea en la base de datos.');
    }

    console.log('Tarea guardada en la base de datos:', savedTarea);

    const savedObject = savedTarea.toObject?.() ?? (savedTarea as any);

    const response: TareaConTempId = {
      ...savedObject,
      clientTempId: createTareaDto.clientTempId,
    };

    console.log('Respuesta enviada al cliente:', response);

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
    if (order !== undefined) updateData.order = order;

    return this.tareaModel
      .findByIdAndUpdate(taskId, updateData, { new: true })
      .exec();
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
