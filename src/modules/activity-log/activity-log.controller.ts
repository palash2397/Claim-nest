import { Body, Controller, Get, Post, Req, Param } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

import { CreateActivityLogDto } from './dto/create-activity-log.dto';

@Controller('case/activity-log')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateActivityLogDto, @Req() req: any) {
    return this.activityLogService.create(dto, req.user.id);
  }


  @Get("/:id")
  @UseGuards(JwtAuthGuard)
  getActivity(@Req() req: any, @Param('id') id: string) {
    return this.activityLogService.getByCase(id);
  }

}
