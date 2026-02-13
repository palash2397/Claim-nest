import { Controller, Post, Body, UseGuards, Req, Get, Patch, Delete } from '@nestjs/common';
import { CallLogService } from './call-log.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';


import { CreateCallLogDto } from './dto/create-call-log.dto';
import { UpdateCallLogDto } from './dto/update-call-log.dto';


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


  @Patch("/update")
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateCallLogDto) {
    return this.callLogService.updateCallLog(dto);
  }
   
  @Delete("/delete/:id")
  @UseGuards(JwtAuthGuard)
  delete(@Req() req: any) {
    return this.callLogService.deleteCallLog(req.params.id);
  }

  @Get("/by-id/:id")
  @UseGuards(JwtAuthGuard)
  findById(@Req() req: any) {
    return this.callLogService.callLogById(req.params.id);
  }
}
