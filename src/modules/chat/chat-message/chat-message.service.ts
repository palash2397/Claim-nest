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
      const chatData = await this.chatMessageModel.create({
        ...data,
        readBy: [data.senderId],
      });
      return new ApiResponse(201, chatData, Msg.CHAT_MESSAGE_CREATED);
    } catch (error) {
      console.log(`Error creating chat message: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async getMessages(conversationId: string, page: number, limit: number) {
    try {
      const conversation =
        await this.conversationModel.findById(conversationId);
      if (!conversation) {
        return new ApiResponse(404, {}, Msg.CONVERSATION_NOT_FOUND);
      }
      const skip = (page - 1) * limit;

      const messages = await this.chatMessageModel
        .find({ conversationId })
        .sort({ createdAt: -1 }) // latest first
        .skip(skip)
        .limit(limit)
        .populate('senderId', 'name email');
      return new ApiResponse(200, messages, Msg.CHAT_MESSAGE_FETCHED);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async getById(conversationId: string, userId: string) {
    try {
      const conversation = await this.conversationModel.findOne({
        _id: conversationId,
        participants: userId,
      });

      if (!conversation) {
        return new ApiResponse(404, {}, Msg.CONVERSATION_NOT_FOUND);
      }

      return new ApiResponse(200, conversation, Msg.CHAT_MESSAGE_FETCHED);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async markAsRead(messageIds: string[], userId: string) {
    try {
      const messages = await this.chatMessageModel.updateMany(
        {
          _id: { $in: messageIds },
          readBy: { $ne: userId },
        },
        {
          $push: { readBy: userId },
        },
      );

      return new ApiResponse(200, messages, Msg.CHAT_MESSAGE_MARKED_AS_READ);
    } catch (error) {
      console.error('Error marking chat messages as read:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
