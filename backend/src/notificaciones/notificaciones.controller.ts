import { Controller, Post, Body } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post()
  enviar(@Body() body: any) {
    return this.notificacionesService.notificar(body.mensaje);
  }
}
