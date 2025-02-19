import { Module } from '@nestjs/common';
import { AdherentsController } from './adherents.controller';
import { AdherentsService } from './adherents.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { CoachsModule } from 'src/coachs/coachs.module';

@Module({
  imports: [MongodbModule,CoachsModule],
  
  controllers: [AdherentsController],
  providers: [AdherentsService],
  exports: [AdherentsService]
})
export class AdherentsModule {}
