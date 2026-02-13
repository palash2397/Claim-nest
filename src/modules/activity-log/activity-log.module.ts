import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { ActivityLogController } from './activity-log.controller';

import { ActivityLog, ActivityLogSchema } from './schemas/activity-log.schema';
import { Case, CaseSchema } from '../case/schemas/case.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActivityLog.name, schema: ActivityLogSchema },
      { name: Case.name, schema: CaseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
  exports: [
    ActivityLogService,
    MongooseModule.forFeature([
      { name: 'ActivityLog', schema: ActivityLogSchema },
    ]),
  ],
})
export class ActivityLogModule {}
