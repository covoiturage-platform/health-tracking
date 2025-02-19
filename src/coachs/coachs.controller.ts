import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CoachsService } from './coachs.service';

@Controller('coachs')
export class CoachsController {
  constructor(private readonly coachsService: CoachsService) {}
  @Get()
  findAll() {
    return this.coachsService.findAllCoachs();
  }

  @Get(':id')
  findOneCoach(@Param('id') id: string) {
    return this.coachsService.findOneCoach(id);
  }
}
