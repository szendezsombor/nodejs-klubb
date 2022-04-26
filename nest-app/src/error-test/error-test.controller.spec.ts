import { Test, TestingModule } from '@nestjs/testing';
import { ErrorTestController } from './error-test.controller';

describe('ErrorTestController', () => {
  let controller: ErrorTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrorTestController],
    }).compile();

    controller = module.get<ErrorTestController>(ErrorTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
