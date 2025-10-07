import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TareasGateway } from './tareas.gateway';
import { Tarea, TareaSchema } from './tareas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tarea.name, schema: TareaSchema }]),
  ],
  controllers: [TareasController],
  providers: [TareasService, TareasGateway],
  exports: [TareasService, TareasGateway],
})
export class TareasModule {}
