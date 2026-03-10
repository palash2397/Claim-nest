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

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('microsoft')
@UseGuards(JwtAuthGuard)
// @UseGuards(AuthGuard('jwt'))
export class MicrosoftController {
  constructor(
    private readonly microsoftService: MicrosoftService,
    private readonly outlookService: OutlookService,
  ) {}

  @Get('emails')
  async getEmails(@Req() req: Request) {
    return this.outlookService.getEmails(req.user!.id);
  }

  @Post('send-email')
  async sendEmail(
    @Req() req: Request,
    @Body() body: { to: string; subject: string; content: string },
  ) {
    return this.outlookService.sendEmail(
      req.user!.id,
      body.to,
      body.subject,
      body.content,
    );
  }
}
