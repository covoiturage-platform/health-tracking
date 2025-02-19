import { Test, TestingModule } from '@nestjs/testing';
import { PlansNutritionService } from './plans_nutrition.service';

describe('PlansNutritionService', () => {
  let service: PlansNutritionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlansNutritionService],
    }).compile();

    service = module.get<PlansNutritionService>(PlansNutritionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
