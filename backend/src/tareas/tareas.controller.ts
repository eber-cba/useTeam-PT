import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get()
  findAll() {
    return this.tareasService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.tareasService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tareasService.delete(id);
  }
}
