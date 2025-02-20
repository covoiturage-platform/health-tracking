import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AdherentsService } from './adherents.service';
import { CreateAdherentDto } from './dto/create-adherent.dto';
import { UpdateAdherentDto } from './dto/update-adherent.dto';

@ApiTags('adherents')
@Controller('adherents')
export class AdherentsController {
  constructor(private readonly adherentsService: AdherentsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all adherents' })
  @ApiResponse({ status: 200, description: 'List of adherents', type: [CreateAdherentDto] })
  findAll() {
    return this.adherentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single adherent by ID' })
  @ApiParam({ name: 'id', description: 'ID of the adherent', type: Number })
  @ApiResponse({ status: 200, description: 'The found adherent', type: CreateAdherentDto })
  @ApiResponse({ status: 404, description: 'Adherent not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adherentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new adherent' })
  @ApiBody({ description: 'Data for the new adherent', type: CreateAdherentDto })
  @ApiResponse({ status: 201, description: 'The created adherent', type: CreateAdherentDto })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(
    @Body(ValidationPipe)
    createAdherentDto: CreateAdherentDto,
  ) {
    return this.adherentsService.create(createAdherentDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing adherent' })
  @ApiParam({ name: 'id', description: 'ID of the adherent to update', type: Number })
  @ApiBody({ description: 'Updated data for the adherent', type: UpdateAdherentDto })
  @ApiResponse({ status: 200, description: 'The updated adherent', type: UpdateAdherentDto })
  @ApiResponse({ status: 404, description: 'Adherent not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    adherentUpdate: UpdateAdherentDto,
  ) {
    return this.adherentsService.update(id, adherentUpdate);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an adherent' })
  @ApiParam({ name: 'id', description: 'ID of the adherent to delete', type: Number })
  @ApiResponse({ status: 200, description: 'Adherent deleted successfully' })
  @ApiResponse({ status: 404, description: 'Adherent not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adherentsService.remove(id);
  }
}