// src/export/export.controller.ts
import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  /**
   * POST /api/export/backlog
   * Optional body: { to: string | string[] }
   * - If `to` is provided as string (comma separated) or array, it will be used as recipients.
   * - Otherwise `ExportService` will fallback to N8N_EMAIL_TO env var.
   */
  @Post('backlog')
  async exportBacklog(
    @Body() body: { to?: string | string[], column?: string, fields?: string[], mensaje?: string } = {},
    @Res() res,
  ) {
    // Normalize recipients
    let recipients: string[] | undefined = undefined;
    if (body?.to) {
      if (Array.isArray(body.to)) {
        recipients = body.to.map((s) => String(s).trim()).filter(Boolean);
      } else if (typeof body.to === 'string') {
        recipients = body.to
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    // Pasar los nuevos parámetros al servicio
    const result = await this.exportService.triggerExport(recipients, body.column, body.fields, body.mensaje);
    return res.status(HttpStatus.OK).json(result);
  }
}
