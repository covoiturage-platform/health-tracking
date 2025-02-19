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
  findAllAdherents() {
    return this.adherentsService.findAll();
  }

  @Get(':id')
  findOneAdherent(@Param('id') id: string) {
    return this.adherentsService.findOne(id);
  }

  @Post()
  createAdherent(
    @Body(ValidationPipe)
    createAdherentDto: CreateAdherentDto,
  ) {
    return this.adherentsService.createAdherent(createAdherentDto);
  }

  @Patch(':id')
  updateAdherent(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe)
    adherentUpdate: UpdateAdherentDto,
  ) {
    return this.adherentsService.update(id, adherentUpdate);
  }

  @Delete(':id')
  removeAdherent(@Param('id', ParseIntPipe) id: string) {
    return this.adherentsService.removeAdherent(id);
  }
}
