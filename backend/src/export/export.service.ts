// src/export/export.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExportService {
  async triggerExport() {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new HttpException(
        'N8N_WEBHOOK_URL no está configurada en el archivo .env',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const response = await axios.post(webhookUrl, {
        message: 'Export backlog',
      });
      return { success: true, data: response.data };
    } catch (err: any) {
      // Esto devuelve información más clara sobre por qué falló
      throw new HttpException(
        `Error conectando con n8n: ${err.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
