import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { AdherentsService } from './adherents.service';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';

@Controller('adherents')
export class AdherentsController {
  constructor(private readonly adherentsService: AdherentsService) {}

  @Get()
  findAll(@Query('role') role?: 'INTERNAL' | 'EXTERNAL') {
    return this.adherentsService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.adherentsService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    adherent: CreateAdherentDto,
  ) {
    return this.adherentsService.create(adherent);
  }

  @Patch(':id')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body(ValidationPipe)
    adherentUpdate: UpdateAdherentDto,
  ) {
    return this.adherentsService.update(id, adherentUpdate);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.adherentsService.remove(id);
  }
}
