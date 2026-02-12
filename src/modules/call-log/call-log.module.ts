import { Module } from '@nestjs/common';
import { CallLogService } from './call-log.service';
import { CallLogController } from './call-log.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { CallLog, CallLogSchema } from './schemas/callLog.schema';
import { Case, CaseSchema } from '../case/schemas/case.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  controllers: [CallLogController],
  providers: [CallLogService],
  exports: [
    CallLogService,
    MongooseModule.forFeature([{ name: CallLog.name, schema: CallLogSchema }]),
  ],
  imports: [
    MongooseModule.forFeature([
      { name: CallLog.name, schema: CallLogSchema },
      { name: Case.name, schema: CaseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class CallLogModule {}
