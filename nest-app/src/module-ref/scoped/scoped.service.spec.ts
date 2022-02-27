import { Test, TestingModule } from '@nestjs/testing';
import { ScopedService } from './scoped.service';

describe('ScopedService', () => {
  let service: ScopedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScopedService],
    }).compile();

    service = module.get<ScopedService>(ScopedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
