import { Module } from '@nestjs/common';
import { AdherentsController } from './adherents.controller';
import { AdherentsService } from './adherents.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  controllers: [AdherentsController],
  providers: [AdherentsService]
})
export class AdherentsModule {}
