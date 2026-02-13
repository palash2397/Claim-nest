import { Module } from '@nestjs/common';
import { CaseProtestAppealService } from './case-protest-appeal.service';
import { CaseProtestAppealController } from './case-protest-appeal.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ProtestAppeal, ProtestAppealSchema } from './schemas/create-case-protest-appeal.schema';
import { Case, CaseSchema } from '../case/schemas/case.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Event, EventSchema } from '../event/schemas/event.schema';
import { Task, TaskSchema } from '../task/schemas/task.schema';

@Module({
  controllers: [CaseProtestAppealController],
  providers: [CaseProtestAppealService],
  imports: [
      MongooseModule.forFeature([
        { name: ProtestAppeal.name, schema: ProtestAppealSchema },
        { name: Case.name, schema: CaseSchema },
        { name: User.name, schema: UserSchema },
        { name: Event.name, schema: EventSchema },
        { name: Task.name, schema: TaskSchema },
      ]),
    ],

  exports: [CaseProtestAppealService, MongooseModule.forFeature([
    { name: ProtestAppeal.name, schema: ProtestAppealSchema }
  ])],
})
export class CaseProtestAppealModule {}
