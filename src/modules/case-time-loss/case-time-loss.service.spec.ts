import { Test, TestingModule } from '@nestjs/testing';
import { CaseTimeLossService } from './case-time-loss.service';

describe('CaseTimeLossService', () => {
  let service: CaseTimeLossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseTimeLossService],
    }).compile();

    service = module.get<CaseTimeLossService>(CaseTimeLossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
