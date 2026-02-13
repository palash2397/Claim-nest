import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Req,
  Get,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { CaseDocumentsService } from './case-documents.service';
import { AddDocumentDto } from './dto/create-document.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('case-documents')
export class CaseDocumentsController {
  constructor(private readonly caseDocumentsService: CaseDocumentsService) {}

  @Post("/upload")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Body() dto: AddDocumentDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.caseDocumentsService.upload(dto, req.user.id, file);
  }

  @Get("/find/:caseId")
  @UseGuards(JwtAuthGuard)
  async findByCaseId(@Param('caseId') caseId: string) {
    return this.caseDocumentsService.findByCaseId(caseId);
  }
}
