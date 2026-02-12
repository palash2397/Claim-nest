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
  }
}
