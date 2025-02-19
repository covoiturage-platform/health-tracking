import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdherentsModule } from './adherents/adherents.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { CoachsModule } from './coachs/coachs.module';
import { ActivitesModule } from './activites/activites.module';
import { PlansNutritionModule } from './plans_nutrition/plans_nutrition.module';

@Module({
  imports: [AdherentsModule, MongodbModule, CoachsModule, ActivitesModule, PlansNutritionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
