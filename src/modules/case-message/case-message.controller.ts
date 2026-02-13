import { Controller } from '@nestjs/common';
import { CaseMessageService } from './case-message.service';

@Controller('case-message')
export class CaseMessageController {
  constructor(private readonly caseMessageService: CaseMessageService) {}
}
