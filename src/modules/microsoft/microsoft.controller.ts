import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

import { OutlookService } from './outlook/outlook.service';
import { MicrosoftService } from './microsoft.service';

@Controller('microsoft')
@UseGuards(AuthGuard('jwt'))
export class MicrosoftController {
  constructor(
    private readonly microsoftService: MicrosoftService,
    private readonly outlookService: OutlookService,
  ) {}

  @Get('emails')
  async getEmails(@Req() req: Request) {
    return this.outlookService.getEmails(req.user!.id);
  }
}
