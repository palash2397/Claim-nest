import { Test, TestingModule } from '@nestjs/testing';
import { TimeLossService } from './time-loss.service';

describe('TimeLossService', () => {
  let service: TimeLossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeLossService],
    }).compile();

    service = module.get<TimeLossService>(TimeLossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
