import { Controller, Get, Post, Body, Param, Patch, Delete, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CoachsService } from './coachs.service';
import { Coach } from './entities/coach.entity';

@ApiTags('coachs')
@Controller('coachs')
export class CoachsController {
  constructor(private readonly coachsService: CoachsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all coachs' })
  @ApiResponse({ status: 200, description: 'List of coachs', type: [Coach] })
  findAll() {
    return this.coachsService.findAllCoachs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single coach by ID' })
  @ApiParam({ name: 'id', description: 'ID of the coach', type: String, example: '60d0fe4f5311236168a109ca' })
  @ApiResponse({ status: 200, description: 'The found coach', type: Coach })
  @ApiResponse({ status: 404, description: 'Coach not found' })
  findOneCoach(@Param('id') id: string) {
    return this.coachsService.findOneCoach(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new coach' })
  @ApiBody({
    description: 'Data for the new coach',
    type: Coach,
    examples: {
      example1: {
        summary: 'Example coach',
        value: {
          nom: 'Anne Burns',
          telephone: '801.857.2302',
          specialite: 'Zumba',
          email: 'anne.burns@coachingpro.com',
          adherents: [
            '24', '69', '83', '92', '102', '105', '108', '112', '118', '133', '144', '149', '229', '253', '260', '287', '316', '382', '387', '390', '399', '401', '439', '462', '496'
          ],
          date_recrutement: '2018-02-26',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The created coach', type: Coach })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  createCoach(
    @Body(ValidationPipe)
    coachData: Partial<Coach>,
  ) {
    return this.coachsService.createCoach(coachData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing coach' })
  @ApiParam({ name: 'id', description: 'ID of the coach to update', type: String, example: '60d0fe4f5311236168a109ca' })
  @ApiBody({
    description: 'Updated data for the coach',
    type: Coach,
    examples: {
      example1: {
        summary: 'Example update',
        value: {
          nom: 'Anne Burns',
          telephone: '801.857.2302',
          specialite: 'Zumba',
          email: 'anne.burns@coachingpro.com',
          adherents: [
            '24', '69', '83', '92', '102', '105', '108', '112', '118', '133', '144', '149', '229', '253', '260', '287', '316', '382', '387', '390', '399', '401', '439', '462', '496'
          ],
          date_recrutement: '2018-02-26',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The updated coach', type: Coach })
  @ApiResponse({ status: 404, description: 'Coach not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  updateCoach(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateData: Partial<Coach>,
  ) {
    return this.coachsService.updateCoach(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a coach' })
  @ApiParam({ name: 'id', description: 'ID of the coach to delete', type: String, example: '60d0fe4f5311236168a109ca' })
  @ApiResponse({ status: 200, description: 'Coach deleted successfully' })
  @ApiResponse({ status: 404, description: 'Coach not found' })
  removeCoach(@Param('id') id: string) {
    return this.coachsService.removeCoach(id);
  }

  @Get('speciality/:specialite')
  @ApiOperation({ summary: 'Retrieve coachs by speciality' })
  @ApiParam({ name: 'specialite', description: 'Speciality of the coach', type: String, example: 'Fitness' })
  @ApiResponse({ status: 200, description: 'List of coachs by speciality', type: [Coach] })
  findBySpeciality(@Param('specialite') specialite: string) {
    return this.coachsService.findBySpeciality(specialite);
  }

  @Get('count')
  @ApiOperation({ summary: 'Count total number of coachs' })
  @ApiResponse({ status: 200, description: 'Total number of coachs' })
  countCoachs() {
    return this.coachsService.countCoachs();
  }
}