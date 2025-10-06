// src/export/export.controller.ts
import { Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { ExportService } from './export.service';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Post('backlog')
  async exportBacklog(@Res() res) {
    const result = await this.exportService.triggerExport();
    return res.status(HttpStatus.OK).json(result);
  }
}
