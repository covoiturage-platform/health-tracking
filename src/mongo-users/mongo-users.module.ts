import { Module } from '@nestjs/common';
import { MongoUsersService } from './mongo-users.service';
import { MongoUsersController } from './mongo-users.controller';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  controllers: [MongoUsersController],
  providers: [MongoUsersService],
})
export class MongoUsersModule {}
