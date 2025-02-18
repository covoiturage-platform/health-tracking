import { Test, TestingModule } from '@nestjs/testing';
import { ActivitesController } from './activites.controller';

describe('ActivitesController', () => {
  let controller: ActivitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitesController],
    }).compile();

    controller = module.get<ActivitesController>(ActivitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
