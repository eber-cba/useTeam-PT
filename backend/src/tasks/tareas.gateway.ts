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

  constructor(private readonly tareasService: TareasService) {}

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    client.emit('connected', {
      message: 'Conectado al servidor de colaboración',
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('join-kanban')
  handleJoinKanban(@ConnectedSocket() client: Socket) {
    client.join('kanban-room');
    console.log(`Cliente ${client.id} se unió al tablero Kanban`);
    client.emit('joined-kanban', { message: 'Te has unido al tablero Kanban' });
  }

  @SubscribeMessage('leave-kanban')
  handleLeaveKanban(@ConnectedSocket() client: Socket) {
    client.leave('kanban-room');
    console.log(`Cliente ${client.id} salió del tablero Kanban`);
  }

  @SubscribeMessage('task-moved')
  async handleTaskMoved(
    @MessageBody()
    data: { taskId: string; newColumna: string; userId?: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // Actualizar la tarea en la base de datos
      const updatedTask = await this.tareasService.updateTaskColumn(
        data.taskId,
        data.newColumna,
      );

      // Emitir a todos los clientes en la sala (excepto al que envió el evento)
      client.to('kanban-room').emit('task-updated', {
        task: updatedTask,
        movedBy: data.userId || client.id,
        timestamp: new Date().toISOString(),
      });

      console.log(
        `Tarea ${data.taskId} movida a ${data.newColumna} por ${data.userId || client.id}`,
      );
    } catch (error) {
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
      // Crear la tarea en la base de datos
      const newTask = await this.tareasService.create(data.task);

      // Emitir a todos los clientes en la sala
      this.server.to('kanban-room').emit('task-added', {
        task: newTask,
        createdBy: data.userId || client.id,
        timestamp: new Date().toISOString(),
      });

      console.log(`Nueva tarea creada por ${data.userId || client.id}`);
    } catch (error) {
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
      // Actualizar la tarea en la base de datos
      const updatedTask = await this.tareasService.update(
        data.taskId,
        data.updates,
      );

      // Emitir a todos los clientes en la sala (excepto al que envió el evento)
      client.to('kanban-room').emit('task-modified', {
        task: updatedTask,
        updatedBy: data.userId || client.id,
        timestamp: new Date().toISOString(),
      });

      console.log(
        `Tarea ${data.taskId} actualizada por ${data.userId || client.id}`,
      );
    } catch (error) {
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
      // Eliminar la tarea de la base de datos
      await this.tareasService.remove(data.taskId);

      // Emitir a todos los clientes en la sala
      this.server.to('kanban-room').emit('task-removed', {
        taskId: data.taskId,
        deletedBy: data.userId || client.id,
        timestamp: new Date().toISOString(),
      });

      console.log(
        `Tarea ${data.taskId} eliminada por ${data.userId || client.id}`,
      );
    } catch (error) {
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
    // Reenvía el nuevo orden a todos los clientes menos el que lo envió
    client.to('kanban-room').emit('column-reordered', { columns: data.columns });
  }

  // Método para emitir actualizaciones desde el servicio
  emitTaskUpdate(event: string, data: any) {
    this.server.to('kanban-room').emit(event, data);
  }
}
