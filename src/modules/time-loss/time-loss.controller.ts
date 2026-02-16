import { Controller, Post, Body, UseGuards, Req, Patch, Param, Get } from '@nestjs/common';
import { TimeLossService } from './time-loss.service';

import { CreateTimeLossDto } from './dto/create-time-loss.dto';
import { UpdateTimeLossDto } from './dto/update-time-loss.dto';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('time/loss')
export class TimeLossController {
  constructor(private readonly timeLossService: TimeLossService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateTimeLossDto, @Req() req: any) {
    return this.timeLossService.create(dto, req.user);
  }

  @Patch("/update")
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateTimeLossDto, @Req() req: any) {
    return this.timeLossService.update(dto, req.user.Id);
  }

  @Get("/find/:id")
  @UseGuards(JwtAuthGuard)
  get(@Param("id") id: string) {
    return this.timeLossService.findOne(id);
  }

  @Get("/find/all")
  @UseGuards(JwtAuthGuard)
  list() {
    return this.timeLossService.findAll();
  }
}
