import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TareasModule } from './tareas/tareas.module';
import { ExportModule } from './export/export.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    TareasModule,
    ExportModule,
    NotificacionesModule,
  ],
})
export class AppModule {}
