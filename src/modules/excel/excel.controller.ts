import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFile,
  Get,
  Patch,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';


import { ExcelService } from './excel.service';
import { UploadExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(
    @Body() dto: UploadExcelDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.excelService.uploadExcel(dto, file, req.user.id);
  }


  @Patch('/update')
  @UseGuards(JwtAuthGuard)
  async updateExcel( @Body() dto: UpdateExcelDto) {
    return this.excelService.updateExcel( dto);
  }


  //   @Get('/find/:id')
  //   @UseGuards(JwtAuthGuard)
  //   async findExcel(@Param('id') id: string) {
  //     return this.excelService.findExcel(id);
  //   }
  // }
}
