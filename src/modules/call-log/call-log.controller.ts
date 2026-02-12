import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { CallLogService } from './call-log.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateCallLogDto } from './dto/create-call-log.dto';

@Controller('call-log')
export class CallLogController {
  constructor(private readonly callLogService: CallLogService) {}

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateCallLogDto, @Req() req: any) {
    return this.callLogService.createCallLog(dto, req.user.id);
  }

  @Get("/all")
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.callLogService.allCallLog();
  }


  @Get("/by-id/:id")
  @UseGuards(JwtAuthGuard)
  findById(@Req() req: any) {
    return this.callLogService.callLogById(req.params.id);
  }
}
