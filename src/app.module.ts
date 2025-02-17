import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdherentsModule } from './adherents/adherents.module';

@Module({
  imports: [AdherentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
