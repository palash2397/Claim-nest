import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from './schemas/case.schema';
import { CaseCounter, CaseCounterSchema } from './schemas/case-counter.schema';
import { ActivityLog, ActivityLogSchema } from '../activity-log/schemas/activity-log.schema';
import { Note, NoteSchema } from '../notes/schemas/create-note.schema';
import { CallLog, CallLogSchema } from '../call-log/schemas/callLog.schema';

import { UserModule } from '../user/user.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Case.name, schema: CaseSchema },
      { name: CaseCounter.name, schema: CaseCounterSchema },
    ]),
    UserModule,
    AwsModule,
  ],
  controllers: [CaseController],
  providers: [CaseService],
  exports: [
    CaseService,
    MongooseModule.forFeature([
      { name: Case.name, schema: CaseSchema },
      { name: CaseCounter.name, schema: CaseCounterSchema },
    ]),
  ],
})
export class CaseModule {}
