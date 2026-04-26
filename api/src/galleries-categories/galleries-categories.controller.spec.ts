import { Test, TestingModule } from '@nestjs/testing';
import { GalleriesCategoriesController } from './galleries-categories.controller';

describe('GalleriesCategoriesController', () => {
  let controller: GalleriesCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalleriesCategoriesController],
    }).compile();

    controller = module.get<GalleriesCategoriesController>(GalleriesCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
