import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { TareasModule } from '../tareas/tareas.module';

@Module({
  imports: [TareasModule],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
