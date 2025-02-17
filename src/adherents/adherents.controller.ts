import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('adherents')
export class AdherentsController {
  @Get()
  findAll(@Query('role') role?: 'INTERNAL' | 'EXTERNAL') {
    return 'This action returns all adherents';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'This action returns one adherent' + id;
  }

  @Post()
  create(@Body() adherent: {}) {
    return adherent;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() adherentUpdate: {}) {
    return { id, ...adherentUpdate };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'This action removes a adherent' + id;
  }
}
