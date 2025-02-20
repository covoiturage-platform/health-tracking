import { Module } from '@nestjs/common';
import { PlansNutritionService } from './plans_nutrition.service';
import { PlansNutritionController } from './plans_nutrition.controller';
import { MongodbModule } from 'src/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  providers: [PlansNutritionService],
  controllers: [PlansNutritionController]
})
export class PlansNutritionModule {}
