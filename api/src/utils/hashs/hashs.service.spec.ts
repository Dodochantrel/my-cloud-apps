import { Test, TestingModule } from '@nestjs/testing';
import { HashsService } from './hashs.service';

describe('HashsService', () => {
  let service: HashsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashsService],
    }).compile();

    service = module.get<HashsService>(HashsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
