import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CaseProtestAppealService } from './case-protest-appeal.service';

import { CreateProtestAppealDto } from './dto/case-protest-appeal-dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';


@Controller('case-protest-appeal')
export class CaseProtestAppealController {
  constructor(private readonly caseProtestAppealService: CaseProtestAppealService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateProtestAppealDto, @Req() req: any) {
    return this.caseProtestAppealService.create(dto, req.user.id);
  }
}
