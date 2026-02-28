import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { Message, MessageDocument } from './schemas/message.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';

import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Case') private caseModel: Model<CaseDocument>,
  ) {}

  async create(dto: CreateMessageDto) {
    try {
      const { from, caseId, message, assignTo, status } = dto;
      const user = await this.userModel.findById(from);

      if (!user) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }

      const caseDoc = await this.caseModel.findById(caseId);

      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      const messageDoc = new this.messageModel({
        from,
        regarding: caseId,
        message,
        status,
        assignTo,
      });

      await messageDoc.save();

      return new ApiResponse(201, messageDoc, Msg.MESSAGE_CREATED);
    } catch (error) {
      console.log(`error while creating message: ${error.message}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: UpdateMessageDto) {
    try {
      const { id, from, caseId, message, status, assignTo } = dto;

      const msg = await this.messageModel.findById(id);
   
      if (!msg) {
        return new ApiResponse(404, {}, Msg.MESSAGE_NOT_FOUND);
      }
      
      msg.from = new Types.ObjectId(from) || msg.from;
      msg.regarding = new Types.ObjectId(caseId) || msg.regarding;
      msg.message = message || msg.message;
      msg.status = status || msg.status;
      msg.assignTo = new Types.ObjectId(assignTo) || msg.assignTo;
      await msg.save();

      return new ApiResponse(200, {}, Msg.MESSAGE_UPDATED);
    } catch (error) {
      console.log(`error while updating message: ${error.message}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      const messageDoc = await this.messageModel.findByIdAndDelete(id);

      if (!messageDoc) {
        return new ApiResponse(404, {}, Msg.MESSAGE_NOT_FOUND);
      }

      return new ApiResponse(200, {}, Msg.MESSAGE_DELETED);
    } catch (error) {
      console.log(`error while deleting message: ${error.message}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const messageDoc = await this.messageModel.findById(id)
      .populate('from', 'name email')
      .populate('regarding', 'caseId clientName')
      .lean();

      if (!messageDoc) {
        return new ApiResponse(404, {}, Msg.MESSAGE_NOT_FOUND);
      }

      return new ApiResponse(200, messageDoc, Msg.MESSAGE_FETCHED);
    } catch (error) {
      console.log(`error while fetching message: ${error.message}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async all() {
    try {
      const messages = await this.messageModel.find()
      .populate('from', 'name email')
      .populate('regarding', 'caseId clientName')
      .lean()
      if (!messages || messages.length === 0) {
        return new ApiResponse(404, {}, Msg.MESSAGE_NOT_FOUND);
      }
      return new ApiResponse(200, messages, Msg.MESSAGE_LIST_FETCHED);
    } catch (error) {
      console.log(`error while fetching messages: ${error.message}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
