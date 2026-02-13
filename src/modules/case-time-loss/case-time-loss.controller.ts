import { Controller, Post, Get, UseGuards, Body, Req, Param } from '@nestjs/common';
import { CaseTimeLossService } from './case-time-loss.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';


import { CreateTimeLossDto } from './dto/create-time-loss.dto';
import { Request } from 'express';

@Controller('case-time-loss')
export class CaseTimeLossController {
  constructor(private readonly caseTimeLossService: CaseTimeLossService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateTimeLossDto, @Req() req: any) {
    return this.caseTimeLossService.create(dto, req.user.id);
  }

  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.caseTimeLossService.findOne(id);
  }
}
