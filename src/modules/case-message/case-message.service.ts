import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { CaseMessage, CaseMessageDocument } from './schemas/case-msg.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { CreateCaseMessageDto } from './dto/create-case-msg.dto';

@Injectable()
export class CaseMessageService {
  constructor(
    @InjectModel(CaseMessage.name)
    private caseMessageModel: Model<CaseMessageDocument>,
    @InjectModel(Case.name)
    private caseModel: Model<CaseDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateCaseMessageDto, userId: string) {
   try {
     const caseDoc = await this.caseModel.findById(dto.caseId);
 
     if (!caseDoc) {
       return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
     }
 
     const entry = await this.caseMessageModel.create({
       caseId: dto.caseId,
       from: new Types.ObjectId(userId),
       regarding: dto.regarding,
       status: dto.status,
       message: dto.message,
       action: dto.action,
       note: dto.note,
       createdBy: new Types.ObjectId(userId),
     });
 
     caseDoc.lastActivity = `Message logged`;
     await caseDoc.save();
 
    return new ApiResponse(201, entry, Msg.CASE_MESSAGE_ADDED);
   } catch (error) {
       console.log(`error while creating case message: ${error}`);
       return new ApiResponse(500, {}, Msg.SERVER_ERROR);
   }
  }
}
