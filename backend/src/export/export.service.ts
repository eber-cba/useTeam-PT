// src/export/export.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExportService {
  /**
   * Triggers the n8n webhook to export backlog.
   * It will include an email recipient list taken from the optional
   * `recipients` parameter or the `N8N_EMAIL_TO` env var (comma separated).
   */
  async triggerExport(recipients?: string[]) {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      throw new HttpException(
        'N8N_WEBHOOK_URL no está configurada en el archivo .env',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Normalize recipients: explicit param wins, otherwise use env var
    const envTo = process.env.N8N_EMAIL_TO || '';
    const toList =
      recipients && recipients.length
        ? recipients
        : envTo
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

    if (!toList || toList.length === 0) {
      // Prevent sending a payload that will make n8n nodemailer throw "No recipients defined"
      throw new HttpException(
        'N8N_EMAIL_TO no está configurada y no se proporcionaron destinatarios. Configure N8N_EMAIL_TO en .env (ej: alice@example.com,bob@example.com) o pase recipients al servicio.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // n8n workflow expects userEmail and userName inside the webhook body
    const payload = {
      message: 'Export backlog',
      // keep the full list available if needed
      to: toList,
      // For the n8n workflow's Send Email node it expects the email in body.userEmail
      userEmail: toList[0],
      userName: process.env.N8N_DEFAULT_USER_NAME || 'Usuario',
      subject: process.env.N8N_EMAIL_SUBJECT || 'Backlog export',
      from: process.env.SMTP_FROM || undefined,
      text:
        process.env.N8N_EMAIL_BODY ||
        'Se exportó el backlog. Revise el adjunto o el flujo en n8n para continuar.',
    };

    try {
      const response = await axios.post(webhookUrl, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });
      return { success: true, data: response.data };
    } catch (err: any) {
      // Provide clearer information about the failure
      const message = err?.response?.data || err?.message || String(err);
      throw new HttpException(
        `Error conectando con n8n: ${message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
