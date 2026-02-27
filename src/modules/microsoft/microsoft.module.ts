import { Module } from '@nestjs/common';
import { MicrosoftService } from './microsoft.service';
import { MicrosoftController } from './microsoft.controller';
import { OutlookService } from './outlook.service';

@Module({
  controllers: [MicrosoftController],
  providers: [MicrosoftService, OutlookService, OutlookService],
})
export class MicrosoftModule {}
