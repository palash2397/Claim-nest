import { Controller, Body, Post, UseGuards, Req } from '@nestjs/common';
import { CaseMailService } from './case-mail.service';

import { CreateCaseEmailDto } from './dto/case-mail.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('case-mail')
export class CaseMailController {
  constructor(private readonly caseMailService: CaseMailService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateCaseEmailDto, @Req() req:any) {
    return this.caseMailService.create(dto, req.user.id);
  }
}
