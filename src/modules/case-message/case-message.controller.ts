import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CaseMessageService } from './case-message.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';


import { CreateCaseMessageDto } from './dto/create-case-msg.dto';

@Controller('case-message')
export class CaseMessageController {
  constructor(private readonly caseMessageService: CaseMessageService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateCaseMessageDto, @Req() req: any) {
    return this.caseMessageService.create(dto, req.user.id);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.caseMessageService.findOne(id);
  }
}
