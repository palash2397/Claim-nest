import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { CallLog, CallLogDocument } from './schemas/callLog.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { CreateCallLogDto } from './dto/create-call-log.dto';
import { UpdateCallLogDto } from './dto/update-call-log.dto';

@Injectable()
export class CallLogService {
  constructor(
    @InjectModel('CallLog')
    private readonly callLogModel: Model<CallLogDocument>,
    @InjectModel('Case')
    private readonly caseModel: Model<CaseDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createCallLog(dto: CreateCallLogDto, userId: string) {
    try {
      const caseDoc = await this.caseModel.findById(dto.case);
      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      const userDoc = await this.userModel.findById(userId);
      if (!userDoc) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }

      const data = await this.callLogModel.create({
        ...dto,
        createdBy: new Types.ObjectId(userId),
      });

      return new ApiResponse(201, data, Msg.CALL_LOG_CREATED);
    } catch (error) {
      console.log(`error while creating call log: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async updateCallLog(dto: UpdateCallLogDto) {
    try {
      const data = await this.callLogModel.findByIdAndUpdate(dto.id, dto, { new: true });
      if (!data) {
        return new ApiResponse(404, {}, Msg.CALL_LOG_NOT_FOUND);
      }
      return new ApiResponse(200, {}, Msg.CALL_LOG_UPDATED);
    } catch (error) {
      console.log(`error while updating call log: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async allCallLog() {
    try {
      const data = await this.callLogModel
        .find()
        .populate('case', 'caseId caseTitle')
        .populate('createdBy', 'name email')
        .lean();
      if (!data || data.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      return new ApiResponse(200, data, Msg.DATA_FETCHED);
    } catch (error) {
      console.log(`error while fetching call logs: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async callLogById(id: string) {
    try {
      const data = await this.callLogModel
        .findById(id)
        .populate('case', 'caseId caseTitle')
        .populate('createdBy', 'name email')
        .lean();
      if (!data) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      return new ApiResponse(200, data, Msg.DATA_FETCHED);
    } catch (error) {
      console.log(`error while fetching call log: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }


}
