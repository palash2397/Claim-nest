import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { CaseContactService } from './case-contact.service';

@Controller('case-contact')
export class CaseContactController {
  constructor(private readonly caseContactService: CaseContactService) {}
  
}