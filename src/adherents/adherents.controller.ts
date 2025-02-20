import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  @ApiParam({ name: 'id', description: 'ID of the adherent', type: String })
  @ApiResponse({ status: 200, description: 'The found adherent', type: CreateAdherentDto })
  @ApiResponse({ status: 404, description: 'Adherent not found' })
  findOne(@Param('id') id: string) {
    return this.adherentsService.findOne(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Retrieve a single adherent by email' })
  @ApiParam({ name: 'email', description: 'Email of the adherent', type: String })
  @ApiResponse({ status: 200, description: 'The found adherent', type: CreateAdherentDto })
  @ApiResponse({ status: 404, description: 'Adherent not found' })
  findByEmail(@Param('email') email: string) {
    return this.adherentsService.findByEmail(email);
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
  @ApiParam({ name: 'id', description: 'ID of the adherent to update', type: String })
  @ApiBody({ description: 'Updated data for the adherent', type: UpdateAdherentDto })
  @ApiResponse({ status: 200, description: 'The updated adherent', type: UpdateAdherentDto })
  @ApiResponse({ status: 404, description: 'Adherent not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe)
    adherentUpdate: UpdateAdherentDto,
  ) {
    return this.adherentsService.update(id, adherentUpdate);
  }

  @Patch(':id/poids')
  @ApiOperation({ summary: 'Update the weight of an adherent' })
  @ApiParam({ name: 'id', description: 'ID of the adherent to update', type: String })
  @ApiBody({ description: 'New weight of the adherent', type: Number })
  @ApiResponse({ status: 200, description: 'The updated adherent' })
  @ApiResponse({ status: 404, description: 'Adherent not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  updatePoids(
    @Param('id') id: string,
    @Body('poids', ValidationPipe) nouveauPoids: number,
  ) {
    return this.adherentsService.updatePoids(id, nouveauPoids);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an adherent' })
  @ApiParam({ name: 'id', description: 'ID of the adherent to delete', type: String })
  @ApiResponse({ status: 200, description: 'Adherent deleted successfully' })
  @ApiResponse({ status: 404, description: 'Adherent not found' })
  remove(@Param('id') id: string) {
    return this.adherentsService.remove(id);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total number of adherents' })
  @ApiResponse({ status: 200, description: 'Total number of adherents' })
  countAdherents() {
    return this.adherentsService.countAdherents();
  }

  @Get('coach/:coachId')
  @ApiOperation({ summary: 'Retrieve adherents by coach ID' })
  @ApiParam({ name: 'coachId', description: 'ID of the coach', type: String })
  @ApiResponse({ status: 200, description: 'List of adherents by coach', type: [CreateAdherentDto] })
  findByCoach(@Param('coachId') coachId: string) {
    return this.adherentsService.findByCoach(coachId);
  }

  @Delete('coach/:coachId')
  @ApiOperation({ summary: 'Delete all adherents by coach ID' })
  @ApiParam({ name: 'coachId', description: 'ID of the coach', type: String })
  @ApiResponse({ status: 200, description: 'All adherents by coach deleted successfully' })
  deleteByCoach(@Param('coachId') coachId: string) {
    return this.adherentsService.deleteByCoach(coachId);
  }
}