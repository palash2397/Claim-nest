import { Module } from '@nestjs/common';
import { MicrosoftService } from './microsoft.service';
import { MicrosoftController } from './microsoft.controller';
import { OutlookService } from './outlook/outlook.service';
;

@Module({
  controllers: [MicrosoftController],
  providers: [MicrosoftService, OutlookService],
  exports:[MicrosoftService]
})
export class MicrosoftModule {}
