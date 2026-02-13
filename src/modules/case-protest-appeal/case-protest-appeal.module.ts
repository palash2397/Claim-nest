import { Module } from '@nestjs/common';
import { CaseProtestAppealService } from './case-protest-appeal.service';
import { CaseProtestAppealController } from './case-protest-appeal.controller';

@Module({
  controllers: [CaseProtestAppealController],
  providers: [CaseProtestAppealService],
})
export class CaseProtestAppealModule {}
