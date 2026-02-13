import { Module } from '@nestjs/common';
import { CaseTimeLossService } from './case-time-loss.service';
import { CaseTimeLossController } from './case-time-loss.controller';

@Module({
  controllers: [CaseTimeLossController],
  providers: [CaseTimeLossService],
})
export class CaseTimeLossModule {}
