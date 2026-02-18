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
import { CreateCaseContactDto } from './dto/create-case-contact.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';


@Controller('case-contact')
export class CaseContactController {
  constructor(private readonly caseContactService: CaseContactService) {}
  

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateCaseContactDto) {
    return this.caseContactService.create(dto);
  }
}