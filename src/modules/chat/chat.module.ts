import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Conversation,
  ConversationSchema,
} from './conversation/schemas/conversation.schema';

import { ConversationController } from './conversation/conversation.controller';
import { ChatMessageController } from './chat-message/chat-message.controller';

import {
  ChatMessage,
  ChatMessageSchema,
} from './chat-message/schemas/chat-message.schema';

import { ChatGateway } from './chat.gateway';
import { ConversationService } from './conversation/conversation.service';
import { ChatMessageService } from './chat-message/chat-message.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
    ChatGateway
  ],
  controllers:[ConversationController, ChatMessageController],
  providers: [ChatGateway, ConversationService, ChatMessageService],
})
export class ChatModule {}
