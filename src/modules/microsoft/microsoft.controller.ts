import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MicrosoftService } from './microsoft.service';

@Controller('microsoft')
export class MicrosoftController {
  constructor(private readonly microsoftService: MicrosoftService) {}
}
