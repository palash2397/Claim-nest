// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// import {
//   Conversation,
//   ConversationSchema,
// } from './conversation/schemas/conversation.schema';

// import {
//   ChatMessage,
//   ChatMessageSchema,
// } from './chat-message/schemas/chat-message.schema';

// import { ChatGateway } from './chat.gateway';
// import { ConversationService } from './conversation/conversation.service';
// import { ChatMessageService } from './chat-message/chat-message.service';
// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: Conversation.name, schema: ConversationSchema },
//       { name: ChatMessage.name, schema: ChatMessageSchema },
//     ]),
//   ],
//   providers: [ChatGateway, ConversationService, ChatMessageService],
// })
// export class ChatModule {}
