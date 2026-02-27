import { Module } from '@nestjs/common';
import { MicrosoftService } from './microsoft.service';
import { MicrosoftController } from './microsoft.controller';
import { OutlookService } from './outlook/outlook.service';
import { CalenderService } from './calender/calender.service';
import { OnedriveService } from './onedrive/onedrive.service';

@Module({
  controllers: [MicrosoftController],
  providers: [
    MicrosoftService,
    OutlookService,
    CalenderService,
    OnedriveService,
  ],
  exports: [MicrosoftService, OutlookService, CalenderService, OnedriveService],
})
export class MicrosoftModule {}
