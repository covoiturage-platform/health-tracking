import { Module } from '@nestjs/common';
import { PlansNutritionService } from './plans_nutrition.service';
import { PlansNutritionController } from './plans_nutrition.controller';

@Module({
  providers: [PlansNutritionService],
  controllers: [PlansNutritionController]
})
export class PlansNutritionModule {}
