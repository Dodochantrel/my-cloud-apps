import { Test, TestingModule } from '@nestjs/testing';
import { GalleriesCategoriesService } from './galleries-categories.service';

describe('GalleriesCategoriesService', () => {
  let service: GalleriesCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GalleriesCategoriesService],
    }).compile();

    service = module.get<GalleriesCategoriesService>(GalleriesCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
