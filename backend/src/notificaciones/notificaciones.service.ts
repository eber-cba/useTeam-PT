import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificacionesService {
  notificar(mensaje: string) {
    return { mensaje, fecha: new Date() };
  }
}
