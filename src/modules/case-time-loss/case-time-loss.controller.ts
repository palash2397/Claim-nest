import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Req,
  Param,
  UploadedFile
} from '@nestjs/common';
import { CaseTimeLossService } from './case-time-loss.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTimeLossDto } from './dto/create-time-loss.dto';
import { Request } from 'express';

@Controller('case-time-loss')
export class CaseTimeLossController {
  constructor(private readonly caseTimeLossService: CaseTimeLossService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() dto: CreateTimeLossDto, @Req() req: any, @UploadedFile() file: Express.Multer.File) {
    return this.caseTimeLossService.create(dto, req.user.id, file);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.caseTimeLossService.findOne(id);
  }
}
