import { Test, TestingModule } from '@nestjs/testing';
import { RegularService } from './regular.service';

describe('RegularService', () => {
  let service: RegularService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegularService],
    }).compile();

    service = module.get<RegularService>(RegularService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
