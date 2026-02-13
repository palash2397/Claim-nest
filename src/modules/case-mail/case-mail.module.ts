import { Module } from '@nestjs/common';
import { CaseMailService } from './case-mail.service';
import { CaseMailController } from './case-mail.controller';

import { Case, CaseSchema } from '../case/schemas/case.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Task, TaskSchema } from '../task/schemas/task.schema';
import { CaseEmail, CaseEmailSchema } from './schemas/case-mail.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CaseEmail.name, schema: CaseEmailSchema },
      { name: Case.name, schema: CaseSchema },
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [CaseMailController],
  providers: [CaseMailService],
  exports: [
    CaseMailService,
    MongooseModule.forFeature([
      { name: CaseEmail.name, schema: CaseEmailSchema },
    ]),
  ],
})
export class CaseMailModule {}
