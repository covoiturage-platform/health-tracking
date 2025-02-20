import { Module } from '@nestjs/common';
import { ActivitesService } from './activites.service';
import { ActivitesController } from './activites.controller';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  providers: [ActivitesService],
  controllers: [ActivitesController]
})
export class ActivitesModule {}
