// src/export/export.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExportService {
  async triggerExport() {
    const webhookUrl = process.env.N8N_WEBHOOK_URL as string;

    if (!webhookUrl) {
      throw new Error('N8N_WEBHOOK_URL no está configurada en el archivo .env');
    }

    try {
      const response = await axios.post(webhookUrl, {
        message: 'Export backlog',
      });
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  }
}
