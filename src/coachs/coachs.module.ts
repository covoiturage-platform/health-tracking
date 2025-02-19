import { Module } from '@nestjs/common';
import { CoachsController } from './coachs.controller';
import { CoachsService } from './coachs.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  controllers: [CoachsController],
  providers: [CoachsService],
  exports: [CoachsService]
})
export class CoachsModule {}
