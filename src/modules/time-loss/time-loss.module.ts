import { Module } from '@nestjs/common';
import { TimeLossService } from './time-loss.service';
import { TimeLossController } from './time-loss.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { TimeLoss, TimeLossSchema } from './schemas/time-loss.schema';
import { Case, CaseSchema } from '../case/schemas/case.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TimeLoss.name, schema: TimeLossSchema },
      { name: Case.name, schema: CaseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TimeLossController],
  providers: [TimeLossService],

  exports: [TimeLossService, MongooseModule.forFeature([
    { name: TimeLoss.name, schema: TimeLossSchema }
  ])],
})
export class TimeLossModule {}
