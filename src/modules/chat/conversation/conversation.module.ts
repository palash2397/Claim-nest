import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema, Conversation } from './dto/conversation.schema';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService],
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  exports: [
    ConversationService,
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
})
export class ConversationModule {}
