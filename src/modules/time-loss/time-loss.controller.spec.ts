import { Test, TestingModule } from '@nestjs/testing';
import { TimeLossController } from './time-loss.controller';
import { TimeLossService } from './time-loss.service';

describe('TimeLossController', () => {
  let controller: TimeLossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeLossController],
      providers: [TimeLossService],
    }).compile();

    controller = module.get<TimeLossController>(TimeLossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
