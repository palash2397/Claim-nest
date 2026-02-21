import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ChatMessage,
  ChatMessageDocument,
} from './schemas/chat-message.schema';

import {
  Conversation,
  ConversationDocument,
} from '../conversation/schemas/conversation.schema';

import { ApiResponse } from 'src/utils/helper/ApiResponse';
import { Msg } from 'src/utils/helper/responseMsg';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectModel(ChatMessage.name)
    private chatMessageModel: Model<ChatMessageDocument>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  async create(data: {
    conversationId: string;
    senderId: string;
    content: string;
  }) {
    try {
      const conversation = await this.conversationModel.findById(
        data.conversationId,
      );
      if (!conversation) {
        return new ApiResponse(404, {}, Msg.CONVERSATION_NOT_FOUND);
      }
      return this.chatMessageModel.create({
        ...data,
        readBy: [data.senderId],
      });
    } catch (error) {
      console.log(`Error creating chat message: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
