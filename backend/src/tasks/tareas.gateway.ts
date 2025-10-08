import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TareasService } from './tareas.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  },
})
export class TareasGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Usuarios conectados
  private connectedUsers: Record<
    string,
    { id: string; name?: string; email?: string }
  > = {};

  constructor(private readonly tareasService: TareasService) {}

  handleConnection(client: Socket) {
    console.log(`✅ Cliente conectado: ${client.id}`);
    this.connectedUsers[client.id] = { id: client.id };

    // Auto-unir a la sala kanban-room
    client.join('kanban-room');
    console.log(`🏠 Cliente ${client.id} auto-unido a kanban-room`);

    this.server.emit('users-connected', Object.values(this.connectedUsers));
    client.emit('connected', {
      message: 'Conectado al servidor de colaboración',
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Cliente desconectado: ${client.id}`);
    delete this.connectedUsers[client.id];
    this.server.emit('users-connected', Object.values(this.connectedUsers));
  }

  @SubscribeMessage('join-kanban')
  handleJoinKanban(@ConnectedSocket() client: Socket) {
    client.join('kanban-room');
    console.log(
      `🏠 Cliente ${client.id} se unió explícitamente al tablero Kanban`,
    );
    client.emit('joined-kanban', { message: 'Te has unido al tablero Kanban' });
  }

  @SubscribeMessage('leave-kanban')
  handleLeaveKanban(@ConnectedSocket() client: Socket) {
    client.leave('kanban-room');
    console.log(`🚪 Cliente ${client.id} salió del tablero Kanban`);
  }

  @SubscribeMessage('task-moved')
  async handleTaskMoved(
    @MessageBody()
    data: {
      taskId: string;
      newColumna: string;
      userId?: string;
      orden?: number;
    },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      console.log(
        `📦 [WS] Moviendo tarea ${data.taskId} a columna ${data.newColumna}`,
      );

      // Actualizar la tarea en la base de datos
      const updatedTask = await this.tareasService.updateTaskColumn(
        data.taskId,
        data.newColumna,
        data.orden,
      );

      if (!updatedTask) {
        console.error(`❌ No se pudo actualizar la tarea ${data.taskId}`);
        client.emit('error', {
          message: 'Error al mover la tarea',
          error: 'Tarea no encontrada',
        });
        return;
      }

      // Emitir a TODOS los clientes en la sala (incluyendo al que movió)
      this.server.to('kanban-room').emit('task-updated', {
        task: updatedTask,
        updates: updatedTask,
        taskId: updatedTask._id,
        movedBy: data.userId || client.id,
        timestamp: new Date().toISOString(),
      });

      console.log(`✅ Tarea ${data.taskId} movida a ${data.newColumna}`);
    } catch (error) {
      console.error('❌ Error en handleTaskMoved:', error);
      client.emit('error', {
        message: 'Error al mover la tarea',
        error: error.message,
      });
    }
  }

  @SubscribeMessage('task-created')
  async handleTaskCreated(
    @MessageBody() data: { task: any; userId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      console.log(`📝 [WS] Creando tarea:`, data.task);

      // Crear la tarea en la base de datos
      const newTask = await this.tareasService.create(data.task);

      if (!newTask) {
        console.error('❌ No se pudo crear la tarea');
        client.emit('error', {
          message: 'Error al crear la tarea',
          error: 'No se pudo guardar en la base de datos',
        });
        return;
      }

      // Emitir a todos los clientes en la sala
      this.server.to('kanban-room').emit('task-added', {
        task: newTask,
        createdBy: data.userId || client.id,
        timestamp: new Date().toISOString(),
      });

      console.log(`✅ Nueva tarea creada: ${newTask._id}`);
    } catch (error) {
      console.error('❌ Error en handleTaskCreated:', error);
      client.emit('error', {
        message: 'Error al crear la tarea',
        error: error.message,
      });
    }
  }

  @SubscribeMessage('task-updated')
  async handleTaskUpdated(
    @MessageBody() data: { taskId: string; updates: any; userId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      console.log(`✏️ [WS] Actualizando tarea ${data.taskId}:`, data.updates);

      // Actualizar la tarea en la base de datos
      const updatedTask = await this.tareasService.update(
        data.taskId,
        data.updates,
      );

      if (!updatedTask) {
        console.error(`❌ No se pudo actualizar la tarea ${data.taskId}`);
        client.emit('error', {
          message: 'Error al actualizar la tarea',
          error: 'Tarea no encontrada',
        });
        return;
      }

      // Emitir a TODOS los clientes en la sala (incluyendo al que actualizó)
      // IMPORTANTE: Usar 'task-updated' consistentemente
      this.server.to('kanban-room').emit('task-updated', {
        task: updatedTask,
        updates: updatedTask,
        taskId: updatedTask._id,
        updatedBy: data.userId || client.id,
        timestamp: new Date().toISOString(),
      });

      console.log(`✅ Tarea ${data.taskId} actualizada`);
    } catch (error) {
      console.error('❌ Error en handleTaskUpdated:', error);
      client.emit('error', {
        message: 'Error al actualizar la tarea',
        error: error.message,
      });
    }
  }

  @SubscribeMessage('task-deleted')
  async handleTaskDeleted(
    @MessageBody() data: { taskId: string; userId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      console.log(`🗑️ [WS] Eliminando tarea ${data.taskId}`);

      // Eliminar la tarea de la base de datos
      await this.tareasService.remove(data.taskId);

      // Emitir a todos los clientes en la sala
      this.server.to('kanban-room').emit('task-removed', {
        taskId: data.taskId,
        deletedBy: data.userId || client.id,
        timestamp: new Date().toISOString(),
      });

      console.log(`✅ Tarea ${data.taskId} eliminada`);
    } catch (error) {
      console.error('❌ Error en handleTaskDeleted:', error);
      client.emit('error', {
        message: 'Error al eliminar la tarea',
        error: error.message,
      });
    }
  }

  @SubscribeMessage('column-reordered')
  async handleColumnReordered(
    @MessageBody() data: { columns: any[] },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`🔄 [WS] Columnas reordenadas por ${client.id}`);

    // Emitir a TODOS los clientes (incluyendo al que reordenó)
    this.server.to('kanban-room').emit('column-reordered', {
      columns: data.columns,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('tasks-reordered')
  async handleTasksReordered(
    @MessageBody() data: { column: string; orderedIds: string[] },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`🔄 [WS] Tareas reordenadas en columna ${data.column}`);

    // Emitir a TODOS los clientes (incluyendo al que reordenó)
    this.server.to('kanban-room').emit('tasks-reordered', {
      column: data.column,
      orderedIds: data.orderedIds,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('column-created')
  async handleColumnCreated(
    @MessageBody() data: { column: any; userId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`➕ [WS] Columna creada:`, data.column);

    // Emitir a TODOS los clientes (incluyendo al que creó)
    this.server.to('kanban-room').emit('column-created', {
      column: data.column,
      createdBy: data.userId || client.id,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('column-removed')
  async handleColumnRemoved(
    @MessageBody() data: { column: any; userId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`➖ [WS] Columna eliminada:`, data.column);

    // Emitir a TODOS los clientes (incluyendo al que eliminó)
    this.server.to('kanban-room').emit('column-removed', {
      column: data.column,
      deletedBy: data.userId || client.id,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('column-updated')
  async handleColumnUpdated(
    @MessageBody() data: { column: any; userId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`✏️ [WS] Columna actualizada:`, data.column);

    // Emitir a TODOS los clientes (incluyendo al que actualizó)
    this.server.to('kanban-room').emit('column-updated', {
      column: data.column,
      updatedBy: data.userId || client.id,
      timestamp: new Date().toISOString(),
    });
  }

  // Método para emitir actualizaciones desde el servicio/controller
  emitTaskUpdate(event: string, data: any) {
    console.log(`📡 [emitTaskUpdate] Emitiendo evento: ${event}`, data);

    // Emitir a TODOS los clientes en la sala
    this.server.to('kanban-room').emit(event, {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    });
  }

  // Método adicional para emitir eventos de columnas
  emitColumnUpdate(event: string, data: any) {
    console.log(`📡 [emitColumnUpdate] Emitiendo evento: ${event}`, data);

    // Emitir a TODOS los clientes en la sala
    this.server.to('kanban-room').emit(event, {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    });
  }
}
