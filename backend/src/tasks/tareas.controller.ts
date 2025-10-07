import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasGateway } from './tareas.gateway';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tareas')
export class TareasController {
  constructor(
    private readonly tareasService: TareasService,
    private readonly tareasGateway: TareasGateway,
  ) {}

  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: any, @Request() req: any) {
    // Use authenticated user as creator when available
    const creator = req.user
      ? {
          id: req.user.id || req.user._id,
          name: req.user.name,
          email: req.user.email,
        }
      : body.createdBy || null;
    const payload = { ...body, createdBy: creator };
    const saved = await this.tareasService.create(payload);
    // Emitir evento de tarea creada para sincronizar en tiempo real
    try {
      this.tareasGateway.emitTaskUpdate('task-added', {
        task: saved,
        createdBy: creator,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error emitiendo evento task-added desde controller:', err);
    }
    // Devolver el clientTempId (si vino) para que el cliente reemplace el temporal exacto
    const response = { ...saved.toObject() } as any;
    if (body.clientTempId) response.clientTempId = body.clientTempId;
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any, @Request() req: any) {
    const editor = req.user
      ? {
          id: req.user.id || req.user._id,
          name: req.user.name,
          email: req.user.email,
        }
      : body.lastEditedBy || null;
    const payload = { ...body, lastEditedBy: editor };
    return this.tareasService.update(id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tareasService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('export-email')
  async exportAndEmail(@Request() req) {
    const userEmail = req.user.email;
    const userName = req.user.name;

    return this.tareasService.exportAndEmail(userEmail, userName);
  }
}
