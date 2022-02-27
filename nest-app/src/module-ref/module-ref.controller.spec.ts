import { Test, TestingModule } from '@nestjs/testing';
import { ModuleRefController } from './module-ref.controller';

describe('ModuleRefController', () => {
  let controller: ModuleRefController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleRefController],
    }).compile();

    controller = module.get<ModuleRefController>(ModuleRefController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
