import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body('name') name: string) {
    return this.columnsService.create(name);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; order?: number },
  ) {
    return this.columnsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
