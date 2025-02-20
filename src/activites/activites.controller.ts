import { Controller, Get, Post, Body, Param, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ActivitesService } from './activites.service';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';
import { Activite } from './entities/activite.entity';

@ApiTags('activites')
@Controller('activites')
export class ActivitesController {
  constructor(private readonly activitesService: ActivitesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all activites' })
  @ApiResponse({ status: 200, description: 'List of activites', type: [Activite] })
  findAll() {
    return this.activitesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single activite by ID' })
  @ApiParam({ name: 'id', description: 'ID of the activite', type: String })
  @ApiResponse({ status: 200, description: 'The found activite', type: Activite })
  @ApiResponse({ status: 404, description: 'Activite not found' })
  findOne(@Param('id') id: string) {
    return this.activitesService.findOne(id);
  }

  @Get('coach/:coachId')
  @ApiOperation({ summary: 'Retrieve activites by coach ID' })
  @ApiParam({ name: 'coachId', description: 'ID of the coach', type: String })
  @ApiResponse({ status: 200, description: 'List of activites by coach', type: [Activite] })
  findByCoach(@Param('coachId') coachId: string) {
    return this.activitesService.findByCoach(coachId);
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Retrieve activites by type' })
  @ApiParam({ name: 'type', description: 'Type of the activite', type: String })
  @ApiResponse({ status: 200, description: 'List of activites by type', type: [Activite] })
  findByType(@Param('type') type: string) {
    return this.activitesService.findByType(type);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new activite' })
  @ApiBody({ description: 'Data for the new activite', type: CreateActiviteDto })
  @ApiResponse({ status: 201, description: 'The created activite', type: Activite })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  create(
    @Body(ValidationPipe)
    createActiviteDto: CreateActiviteDto,
  ) {
    return this.activitesService.create(createActiviteDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing activite' })
  @ApiParam({ name: 'id', description: 'ID of the activite to update', type: String })
  @ApiBody({ description: 'Updated data for the activite', type: UpdateActiviteDto })
  @ApiResponse({ status: 200, description: 'The updated activite', type: Activite })
  @ApiResponse({ status: 404, description: 'Activite not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateActiviteDto: UpdateActiviteDto,
  ) {
    return this.activitesService.update(id, updateActiviteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activite' })
  @ApiParam({ name: 'id', description: 'ID of the activite to delete', type: String })
  @ApiResponse({ status: 200, description: 'Activite deleted successfully' })
  @ApiResponse({ status: 404, description: 'Activite not found' })
  remove(@Param('id') id: string) {
    return this.activitesService.remove(id);
  }

  @Delete('coach/:coachId')
  @ApiOperation({ summary: 'Delete all activites by coach ID' })
  @ApiParam({ name: 'coachId', description: 'ID of the coach', type: String })
  @ApiResponse({ status: 200, description: 'All activites by coach deleted successfully' })
  deleteByCoach(@Param('coachId') coachId: string) {
    return this.activitesService.deleteByCoach(coachId);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total number of activites' })
  @ApiResponse({ status: 200, description: 'Total number of activites' })
  countActivites() {
    return this.activitesService.countActivites();
  }
}