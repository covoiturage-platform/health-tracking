import { Module } from '@nestjs/common';
import { AdherentsModule } from './adherents/adherents.module';
import { MongodbModule } from './mongodb/mongodb.module';
import { CoachsModule } from './coachs/coachs.module';
import { ActivitesModule } from './activites/activites.module';
import { ConfigModule } from '@nestjs/config';
import { PlansNutritionModule } from './plans_nutrition/plans_nutrition.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Global configuration
    AdherentsModule,
    MongodbModule,
    CoachsModule,
    ActivitesModule,
    PlansNutritionModule
  ]
})
export class AppModule {}
