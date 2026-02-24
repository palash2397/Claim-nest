import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

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

import { AwsService } from 'src/modules/aws/aws.service';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectModel(ChatMessage.name)
    private chatMessageModel: Model<ChatMessageDocument>,
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    private awsService: AwsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: {
    conversationId: string;
    senderId: string;
    content: string;
  }) {
    try {
      const conversation = await this.conversationModel.findOne({
        _id: data.conversationId,
        participants: data.senderId,
      });
      if (!conversation) {
        return new ApiResponse(404, {}, Msg.CONVERSATION_NOT_FOUND);
      }
      const chatData = await this.chatMessageModel.create({
        ...data,
        readBy: [data.senderId],
      });

      await this.conversationModel.findByIdAndUpdate(data.conversationId, {
        $set: { updatedAt: new Date() },
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
        .populate('senderId', 'name email')
        .populate('readBy', 'name email');
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
      for (const messageId of messageIds) {
        const message = await this.chatMessageModel.findById(messageId);
        if (!message) {
          return new ApiResponse(404, {}, Msg.CHAT_MESSAGE_NOT_FOUND);
        }
      }

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

  async markConversationAsRead(conversationId: string, userId: string) {
    try {
      const conversation =
        await this.conversationModel.findById(conversationId);
      if (!conversation) {
        return new ApiResponse(404, {}, Msg.CONVERSATION_NOT_FOUND);
      }

      await this.chatMessageModel.updateMany(
        {
          conversationId,
          readBy: { $ne: userId },
        },
        {
          $push: { readBy: userId },
        },
      );

      return new ApiResponse(200, {}, Msg.CONVERSATION_MARKED_AS_READ);
    } catch (error) {
      console.error('Error marking conversation as read:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async createFileMessage(
    conversationId: string,
    file: Express.Multer.File,
    userId: string,
  ) {
    try {
      const conversation =
        await this.conversationModel.findById(conversationId);
      if (!conversation) {
        return new ApiResponse(404, {}, Msg.CONVERSATION_NOT_FOUND);
      }

      const uploadResult = await this.awsService.uploadFile(
        `chat/conversation/${conversationId}/${Date.now()}-${file.originalname}`,
        file.buffer,
        file.mimetype,
      );

      const msgFile = await this.chatMessageModel.create({
        conversationId,
        senderId: new Types.ObjectId(userId),
        content: uploadResult.Location,
        readBy: [new Types.ObjectId(userId)],
        messageType: 'file',
        fileUrl: uploadResult.Location,
        fileName: file.originalname,
      });

      this.eventEmitter.emit('chat.message.created', {
        conversationId,
        msgFile,
      });

      return new ApiResponse(200, msgFile, Msg.CHAT_MESSAGE_CREATED);
    } catch (error) {
      console.log(`error while creating file message: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
