import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OutlookService } from './outlook/outlook.service';

import { MicrosoftService } from './microsoft.service';

@Controller('microsoft')
export class MicrosoftController {
  constructor(private readonly microsoftService: MicrosoftService) {}
}
