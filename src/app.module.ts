import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdherentsModule } from './adherents/adherents.module';
import { MongodbModule } from './mongodb/mongodb.module';

@Module({
  imports: [AdherentsModule, MongodbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
