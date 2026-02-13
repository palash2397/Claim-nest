import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import {
  ActivityLog,
  ActivityLogDocument,
} from './schemas/activity-log.schema';
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
    try {
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

      return new ApiResponse(201, activity, Msg.ACTIVITY_LOG_CREATED);
    } catch (error) {
      console.log(`error while creating activity log: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async getByCase(caseId: string) {
    try {
      const caseDoc = await this.caseModel.findById(caseId);

      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      const activities = await this.activityLogModel
        .find({ caseId })
        .sort({ createdAt: -1 })
        .populate("caseId", "caseId")
        .populate("createdBy", "firstName lastName email");

      if (!activities || activities.length === 0) {
        return new ApiResponse(404, {}, Msg.ACTIVITY_LOG_NOT_FOUND);
      }

      return new ApiResponse(200, activities, Msg.ACTIVITY_LOG_LIST_FETCHED);
    } catch (error) {
      console.log(`error while getting activity log: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
