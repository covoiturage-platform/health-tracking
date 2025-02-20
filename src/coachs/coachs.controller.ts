import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
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
  @ApiParam({ name: 'id', description: 'ID of the coach', type: String })
  @ApiResponse({ status: 200, description: 'The found coach', type: Coach })
  @ApiResponse({ status: 404, description: 'Coach not found' })
  findOneCoach(@Param('id') id: string) {
    return this.coachsService.findOneCoach(id);
  }
}