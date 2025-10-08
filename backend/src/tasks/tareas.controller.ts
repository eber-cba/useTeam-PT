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

  @Post()
  async create(@Body() body: any, @Request() req: any) {
    const creator = req.user
      ? {
          id: req.user.id || req.user._id,
          name: req.user.name,
          email: req.user.email,
        }
      : body.createdBy || null;

    const payload = { ...body, createdBy: creator };
    const saved = await this.tareasService.create(payload);

    // Emitir evento para sincronización en tiempo real
    try {
      this.tareasGateway.emitTaskUpdate('task-added', {
        task: saved,
        createdBy: creator,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Error emitiendo evento task-added desde controller:', err);
    }

    // Uso seguro de toObject
    const savedObject = saved.toObject?.() ?? saved;
    const response = { ...savedObject };
    if (body.clientTempId) response.clientTempId = body.clientTempId;

    return response;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Request() req: any,
  ) {
    const editor = req.user
      ? {
          id: req.user.id || req.user._id,
          name: req.user.name,
          email: req.user.email,
        }
      : body.lastEditedBy || null;

    const payload = { ...body, lastEditedBy: editor };
    const updated = await this.tareasService.update(id, payload);

    // Emitir evento WebSocket para sincronización en tiempo real
    if (updated) {
      try {
        this.tareasGateway.emitTaskUpdate('task-updated', {
          taskId: updated._id,
          updates: updated,
          updatedBy: editor,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error(
          'Error emitiendo evento task-updated desde controller:',
          err,
        );
      }
    }

    const updatedObject = updated?.toObject?.() ?? updated;
    return updatedObject;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(`🗑️ [Controller] Eliminando tarea ${id}`);

    const deleted = await this.tareasService.delete(id);

    // Emitir evento WebSocket para sincronización en tiempo real
    if (deleted) {
      try {
        console.log(
          `📡 [Controller] Emitiendo evento task-removed para tarea ${id}`,
        );
        this.tareasGateway.emitTaskUpdate('task-removed', {
          taskId: id,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        console.error(
          '❌ Error emitiendo evento task-removed desde controller:',
          err,
        );
      }
    }

    const deletedObject = deleted?.toObject?.() ?? deleted;
    return deletedObject;
  }

  @Post('reorder')
  async reorderTasks(@Body() body: { column: string; orderedIds: string[] }) {
    const { column, orderedIds } = body;
    // Actualizar el campo 'orden' de cada tarea en la columna
    await Promise.all(
      orderedIds.map((taskId, idx) =>
        this.tareasService.update(taskId, { orden: idx }),
      ),
    );
    // Obtener las tareas actualizadas de la columna
    const updatedTasks = await this.tareasService.findAll();
    // Emitir evento WebSocket para sincronización en tiempo real
    this.tareasGateway.emitTaskUpdate('tasks-reordered', {
      column,
      orderedIds,
      tasks: updatedTasks.filter((t) => t.columna === column),
    });
    return { success: true };
  }

  @Post('export-email')
  async exportAndEmail(@Request() req) {
    const userEmail = req.user?.email || 'guest@example.com';
    const userName = req.user?.name || 'Invitado';

    return this.tareasService.exportAndEmail(userEmail, userName);
  }
}
