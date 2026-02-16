import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { CaseEmail, CaseEmailDocument } from './schemas/case-mail.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Task, TaskDocument } from '../task/schemas/task.schema';

import { CreateCaseEmailDto } from './dto/case-mail.dto';

@Injectable()
export class CaseMailService {
  constructor(
    @InjectModel(Case.name)
    private readonly caseModel: Model<CaseDocument>,

    @InjectModel(CaseEmail.name)
    private readonly caseEmailModel: Model<CaseEmailDocument>,

    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(dto: CreateCaseEmailDto, userId: string) {
    try {
      const caseDoc = await this.caseModel.findById(dto.caseId);

      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      const email = await this.caseEmailModel.create({
        caseId: dto.caseId,
        direction: dto.direction,
        from: dto.from,
        to: dto.to,
        cc: dto.cc,
        subject: dto.subject,
        emailDate: new Date(dto.emailDate),
        summary: dto.summary,
        attachmentUrl: dto.attachmentUrl,
        followUpRequired: dto.followUpRequired ?? false,
        createdBy: new Types.ObjectId(userId),
      });

      let createdTask: TaskDocument | undefined;

      if (dto.followUpRequired) {
        createdTask = await this.taskModel.create({
          caseId: dto.caseId,
          taskTitle: `Email Follow-Up: ${dto.subject}`,
          internalNotes: dto.summary,
          assignedTo: caseDoc.assignedManager,
          deadline: new Date(dto.emailDate),
          status: 'Pending',
          priority: 'Medium',
          taskType: 'Follow-Up Call',
          sourceModule: 'Email',
          sourceId: email._id,
          createdBy: new Types.ObjectId(userId),
        });

        email.linkedTaskId = createdTask._id;
        await email.save();
      }

      caseDoc.lastActivity = 'Email logged';
      await caseDoc.save();

      //   return { email, task: createdTask };
      return new ApiResponse(
        201,
        { email, task: createdTask },
        Msg.CASE_EMAIL_ADDED,
      );
    } catch (error) {
      console.log(`error while creating case message: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findByCaseId(caseId: string) {
    try {
      const emails = await this.caseEmailModel
        .find({ caseId })
        .populate('linkedTaskId')
        .sort({ emailDate: -1 });
      if (!emails || emails.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      return new ApiResponse(200, emails, Msg.DATA_FETCHED);
    } catch (error) {
      console.log(`error while fetching case emails: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
