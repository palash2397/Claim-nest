import { Controller } from '@nestjs/common';
import { CaseTimeLossService } from './case-time-loss.service';

@Controller('case-time-loss')
export class CaseTimeLossController {
  constructor(private readonly caseTimeLossService: CaseTimeLossService) {}
}
