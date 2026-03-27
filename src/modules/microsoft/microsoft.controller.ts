import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

import { OutlookService } from './outlook/outlook.service';
import { CalenderService } from './calender/calender.service';
import { MicrosoftService } from './microsoft.service';
import { OnedriveService } from './onedrive/onedrive.service';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('microsoft')
@UseGuards(JwtAuthGuard)
// @UseGuards(AuthGuard('jwt'))
export class MicrosoftController {
  constructor(
    private readonly microsoftService: MicrosoftService,
    private readonly outlookService: OutlookService,
    private readonly calenderService: CalenderService,
    private readonly onedriveService: OnedriveService,
  ) {}

  // Outlook endpoints
  @Get('emails/all')
  async getEmails(@Req() req: Request, @Query('pageToken') pageToken?: string) {
    return this.outlookService.getEmails(req.user!.id, pageToken);
  }

  @Get('emails/:id')
  async getEmailById(@Req() req: Request, @Param('id') emailId: string) {
    return this.outlookService.getEmailById(req.user!.id, emailId);
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

  // Calender endpoints
  @Get('calendar/events')
  async getEvents(@Req() req: Request) {
    return this.calenderService.getEvents(req.user!.id);
  }

  @Get('calendar/event/:id')
  async getEventById(@Req() req: Request, @Param('id') eventId: string) {
    return this.calenderService.getEventById(req.user!.id, eventId);
  }

  @Post('calendar/event')
  async createEvent(
    @Req() req: Request,
    @Body()
    body: {
      subject: string;
      content: string;
      start: string;
      end: string;
      attendees: string[];
    },
  ) {
    return this.calenderService.createEvent(req.user!.id, body);
  }

  // Onedrive endpoints
  @Get('onedrive/files')
  async getFiles(@Req() req: Request) {
    return this.onedriveService.listFiles(req.user!.id);
  }

  @Post('onedrive/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    
    return this.onedriveService.uploadFile(
      req.user!.id,
      file.originalname,
      file.buffer,
    );
  }

  @Delete('onedrive/:id')
  async deleteFile(@Req() req: Request, @Param('id') id: string) {
    return this.onedriveService.deleteFile(req.user!.id, id);
  }

  @Get('status')
  async getMicrosoftStatus(@Req() req: Request) {
    return this.microsoftService.microsoftStatus(req.user!.id);
  }

  @Get('emails/folder/:folder')
  async getEmailsByFolder(
    @Req() req: Request,
    @Param('folder') folder: string,
    @Query('pageToken') pageToken?: string,
  ) {
    return this.outlookService.getEmailsByFolder(
      req.user!.id,
      folder,
      pageToken,
    );
  }
}
