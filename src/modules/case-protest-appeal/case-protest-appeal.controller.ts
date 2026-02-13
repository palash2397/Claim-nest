import { Controller } from '@nestjs/common';
import { CaseProtestAppealService } from './case-protest-appeal.service';

@Controller('case-protest-appeal')
export class CaseProtestAppealController {
  constructor(private readonly caseProtestAppealService: CaseProtestAppealService) {}
}
