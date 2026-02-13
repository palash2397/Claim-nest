import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { ActivityLog, ActivityLogDocument } from './schemas/activity-log.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';


import { CreateActivityLogDto } from './dto/create-activity-log.dto';
@Injectable()
export class ActivityLogService {
    constructor(
        @InjectModel(ActivityLog.name)
        private activityLogModel: Model<ActivityLogDocument>,
        @InjectModel(Case.name)
        private caseModel: Model<CaseDocument>,
    ) {}


     async create(dto: CreateActivityLogDto, userId: string) {

    const caseDoc = await this.caseModel.findById(dto.caseId);

    if (!caseDoc) {
      return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
    }

    const activity = await this.activityLogModel.create({
      caseId: dto.caseId,
      activity: dto.activity,
      createdBy: new Types.ObjectId(userId),
    });

    // Update case summary
    caseDoc.lastActivity = dto.activity;
    await caseDoc.save();

    return activity;
  }
}
