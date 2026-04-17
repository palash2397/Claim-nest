import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from './schemas/case.schema';
import { CaseCounter, CaseCounterSchema } from './schemas/case-counter.schema';
import {
  ActivityLog,
  ActivityLogSchema,
} from '../activity-log/schemas/activity-log.schema';
import { Note, NoteSchema } from '../notes/schemas/create-note.schema';
import { CallLog, CallLogSchema } from '../call-log/schemas/callLog.schema';
import {
  CaseEmail,
  CaseEmailSchema,
} from '../case-mail/schemas/case-mail.schema';
import {
  CaseMessage,
  CaseMessageSchema,
} from '../case-message/schemas/case-msg.schema';
import {
  TimeLoss,
  TimeLossSchema,
} from '../case-time-loss/schemas/case-time-loss.schema';
import {
  DocumentFile,
  DocumentFileSchema,
} from '../case-documents/schemas/create-document.schema';

import { ProtestAppeal, ProtestAppealSchema } from '../case-protest-appeal/schemas/create-case-protest-appeal.schema';

import { UserModule } from '../user/user.module';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Case.name, schema: CaseSchema },
      { name: CaseCounter.name, schema: CaseCounterSchema },
      { name: CaseEmail.name, schema: CaseEmailSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
      { name: Note.name, schema: NoteSchema },
      { name: CallLog.name, schema: CallLogSchema },
      { name: CaseMessage.name, schema: CaseMessageSchema },
      { name: DocumentFile.name, schema: DocumentFileSchema },
      { name: TimeLoss.name, schema: TimeLossSchema },
      { name: ProtestAppeal.name, schema: ProtestAppealSchema },
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
