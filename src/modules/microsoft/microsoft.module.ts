import { Module } from '@nestjs/common';
import { MicrosoftService } from './microsoft.service';
import { MicrosoftController } from './microsoft.controller';
import { OutlookService } from './outlook/outlook.service';
import { CalenderService } from './calender/calender.service';
;

@Module({
  controllers: [MicrosoftController],
  providers: [MicrosoftService, OutlookService, CalenderService],
  exports:[MicrosoftService]
})
export class MicrosoftModule {}
