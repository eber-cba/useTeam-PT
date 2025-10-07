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

  async create(createDto: Partial<Tarea>) {
    // Ensure we don't accept a client-provided _id (could be a temp id)
    const data: any = { ...createDto };
    if (data._id) delete data._id;
    if (data.clientTempId) delete data.clientTempId;

    const created = new this.tareaModel(data);
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

  remove(id: string) {
    return this.tareaModel.findByIdAndDelete(id).exec();
  }

  updateTaskColumn(taskId: string, newColumna: string) {
    return this.tareaModel
      .findByIdAndUpdate(taskId, { columna: newColumna }, { new: true })
      .exec();
  }

  async exportAndEmail(userEmail: string, userName: string) {
    try {
      // Llamar a n8n para manejar la exportación y envío de email
      const n8nWebhookUrl =
        process.env.N8N_WEBHOOK_URL ||
        'http://localhost:5678/webhook/kanban-export';

      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    } catch (error) {
      console.error('Error en exportAndEmail:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
