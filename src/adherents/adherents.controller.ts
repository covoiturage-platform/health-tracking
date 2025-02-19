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
  BadRequestException,
} from '@nestjs/common';
import { AdherentsService } from './adherents.service';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';

@Controller('adherents')
export class AdherentsController {
  constructor(private readonly adherentsService: AdherentsService) {}

  @Get('all')
  findAllAdherents() {
    return this.adherentsService.findAll();
  }

  @Get(':id')
  findOneAdherent(@Param('id') id: string) {
    return this.adherentsService.findById(id);
  }
  @Get('')
  findByName(@Query('nom') nom: string) {
    return this.adherentsService.findByName(nom);
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
    @Param('id') id: string,
    @Body()
    adherentUpdate: UpdateAdherentDto,
  ) {
    return this.adherentsService.update(id, adherentUpdate);
  }

  @Delete(':id')
  removeAdherent(@Param('id') id: string) {
    return this.adherentsService.removeAdherent(id);
  }
}
