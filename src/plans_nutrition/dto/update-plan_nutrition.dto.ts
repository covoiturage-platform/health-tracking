import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanNutritionDto } from './create-plan_nutrition.dto';

export class UpdatePlanNutritionDto extends PartialType(CreatePlanNutritionDto) {}