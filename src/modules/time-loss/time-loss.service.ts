import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';


import { TimeLoss, TimeLossDocument } from './schemas/time-loss.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { CreateTimeLossDto } from './dto/create-time-loss.dto';

@Injectable()
export class TimeLossService {
  constructor(
    @InjectModel(TimeLoss.name)
    private timeLossModel: Model<TimeLossDocument>,
    @InjectModel(Case.name)
    private caseModel: Model<CaseDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateTimeLossDto) {
    if (dto.caseId) {
      const caseDoc = await this.caseModel.findById(dto.caseId);
      if (!caseDoc) {
        return new ApiResponse(404,{}, Msg.CASE_NOT_FOUND)
      }
      
    }
    
  }
}
