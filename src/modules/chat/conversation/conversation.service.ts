import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConversationType } from '../../../common/enums/conversation-type.enum';

import {
  Conversation,
  ConversationDocument,
} from './schemas/conversation.schema';

import { User, UserDocument } from '../../user/schemas/user.schema';

import { ApiResponse } from 'src/utils/helper/ApiResponse';
import { Msg } from 'src/utils/helper/responseMsg';

import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createDirect(userId: string, targetUserId: string) {
    try {
      const user = await this.userModel.findById(new Types.ObjectId(userId));

      if (!user) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }
      const targetUser = await this.userModel.findById(
        new Types.ObjectId(targetUserId),
      );

      if (!targetUser) {
        return new ApiResponse(404, {}, Msg.TARGET_USER_NOT_FOUND);
      }

      const existing = await this.conversationModel.findOne({
        type: ConversationType.DIRECT,
        participants: { $all: [userId, targetUserId] },
        $expr: { $eq: [{ $size: '$participants' }, 2] },
      });

      if (existing) return new ApiResponse(200, existing, Msg.SUCCESS);

      const conversationdoc = await this.conversationModel.create({
        type: ConversationType.DIRECT,
        participants: [userId, targetUserId],
        createdBy: userId,
      });

      return new ApiResponse(200, conversationdoc, Msg.SUCCESS);
    } catch (error) {
      console.log(`Error creating direct conversation: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async createGroup(userId: string, dto: CreateGroupDto) {
    try {
      const user = await this.userModel.findById(new Types.ObjectId(userId));

      if (!user) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }

      for (const participant of dto.participants) {
        const user = await this.userModel.findById(
          new Types.ObjectId(participant),
        );

        if (!user) {
          return new ApiResponse(404, {}, Msg.PARTICIPANT_NOT_FOUND);
        }
      }

      const conversationdoc = await this.conversationModel.create({
        type: ConversationType.GROUP,
        title: dto.title,
        participants: [userId, ...dto.participants],
        createdBy: userId,
      });

      return new ApiResponse(200, conversationdoc, Msg.SUCCESS);
    } catch (error) {
      console.log(`Error creating group conversation: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async myConversation(userId: string) {
    try {
      const user = await this.userModel.findById(new Types.ObjectId(userId));

      if (!user) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }

      const conversations = await this.conversationModel
        .find({ participants: userId })
        .populate('participants', 'name email')
        .sort({ updatedAt: -1 });

      return new ApiResponse(200, conversations, Msg.CONVERSATION_LIST_FETCHED);
    } catch (error) {
      console.log(`Error fetching my conversation: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async isParticipant(conversationId: string, userId: string) {
    const conversation = await this.conversationModel.findOne({
      _id: conversationId,
      participants: userId,
    });

    return !!conversation;
  }
}
