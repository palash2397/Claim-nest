import { Module } from '@nestjs/common';
import { CaseMessageService } from './case-message.service';
import { CaseMessageController } from './case-message.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { CaseMessage, CaseMessageSchema } from './schemas/case-msg.schema';
import { Case, CaseSchema } from '../case/schemas/case.schema';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  controllers: [CaseMessageController],
  providers: [CaseMessageService],
  imports: [
    MongooseModule.forFeature([
      { name: CaseMessage.name, schema: CaseMessageSchema },
      { name: Case.name, schema: CaseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],

  exports: [
    CaseMessageService,
    MongooseModule.forFeature([
      { name: CaseMessage.name, schema: CaseMessageSchema },
      { name: Case.name, schema: CaseSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
})
export class CaseMessageModule {}
