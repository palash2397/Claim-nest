import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageController } from './chat-message.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { ChatMessageSchema, ChatMessage } from './schemas/chat-message.schema';

@Module({
  controllers: [ChatMessageController],
  providers: [ChatMessageService],
  imports: [
    MongooseModule.forFeature([
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
  ],
  exports: [
    ChatMessageService,
    MongooseModule.forFeature([
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
  ],
})
export class ChatMessageModule {}
