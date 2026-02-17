import { Module } from '@nestjs/common';
import { CaseTimeLossService } from './case-time-loss.service';
import { CaseTimeLossController } from './case-time-loss.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { TimeLoss, TimeLossSchema } from './schemas/case-time-loss.schema';
import { Case, CaseSchema } from '../case/schemas/case.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

import { AwsModule } from '../aws/aws.module';

@Module({
  controllers: [CaseTimeLossController],
  providers: [CaseTimeLossService],
  imports: [
    MongooseModule.forFeature([
      { name: TimeLoss.name, schema: TimeLossSchema },
      { name: Case.name, schema: CaseSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AwsModule,
  ],

  exports: [
    CaseTimeLossService,
    MongooseModule.forFeature([
      { name: TimeLoss.name, schema: TimeLossSchema },
    ]),
  ],
})
export class CaseTimeLossModule {}
