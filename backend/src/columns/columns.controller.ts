import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('createdBy') createdBy: string,
  ) {
    console.log(`📝 [Controller] Creando columna: ${name}`);
    const created = await this.columnsService.create(name, createdBy);
    console.log(`✅ [Controller] Columna creada:`, created);
    return created;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; order?: number; oldName?: string },
  ) {
    console.log(`✏️ [Controller] Actualizando columna ${id}:`, body);
    const updated = await this.columnsService.update(id, body);
    console.log(`✅ [Controller] Columna actualizada:`, updated);
    return updated;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(`🗑️ [Controller] Eliminando columna ${id}`);
    const removed = await this.columnsService.remove(id);
    console.log(`✅ [Controller] Columna eliminada:`, removed);
    return removed;
  }

  // NUEVO: Endpoint para reordenar columnas
  @Post('reorder')
  async reorderColumns(@Body() body: { columns: any[] }) {
    console.log(
      `🔄 [Controller] Reordenando columnas:`,
      body.columns.map((c) => c.name),
    );
    const reordered = await this.columnsService.reorderColumns(body.columns);
    console.log(`✅ [Controller] Columnas reordenadas`);
    return { success: true, columns: reordered };
  }
}
