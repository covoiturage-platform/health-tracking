import { Module } from '@nestjs/common';
import { ActivitesService } from './activites.service';
import { ActivitesController } from './activites.controller';

@Module({
  providers: [ActivitesService],
  controllers: [ActivitesController]
})
export class ActivitesModule {}
