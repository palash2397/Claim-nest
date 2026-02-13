import { Controller } from '@nestjs/common';
import { CaseDocumentsService } from './case-documents.service';

@Controller('case-documents')
export class CaseDocumentsController {
  constructor(private readonly caseDocumentsService: CaseDocumentsService) {}
}
