import { Test, TestingModule } from '@nestjs/testing';
import { PlansNutritionController } from './plans_nutrition.controller';

describe('PlansNutritionController', () => {
  let controller: PlansNutritionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansNutritionController],
    }).compile();

    controller = module.get<PlansNutritionController>(PlansNutritionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
