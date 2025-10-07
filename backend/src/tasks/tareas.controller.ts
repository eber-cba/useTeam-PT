import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TareasService } from './tareas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post('export-email')
  async exportAndEmail(@Request() req) {
    const userEmail = req.user.email;
    const userName = req.user.name;

    return this.tareasService.exportAndEmail(userEmail, userName);
  }
}
