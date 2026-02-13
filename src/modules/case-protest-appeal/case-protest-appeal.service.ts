import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import {
  ProtestAppeal,
  ProtestAppealDocument,
} from './schemas/create-case-protest-appeal.schema';

import { Task, TaskDocument } from '../task/schemas/task.schema';
import { Event, EventDocument } from '../event/schemas/event.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';


import { CreateProtestAppealDto } from './dto/case-protest-appeal-dto';

@Injectable()
export class CaseProtestAppealService {
  constructor(
    @InjectModel(ProtestAppeal.name)
    private readonly protestAppealModel: Model<ProtestAppealDocument>,
    @InjectModel(Case.name)
    private readonly caseModel: Model<CaseDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,  ) {}

  async create(dto: CreateProtestAppealDto, userId: string) {
   try {
     const caseDoc = await this.caseModel.findById(dto.caseId);
 
     if (!caseDoc) {
       return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
     }
 
     // 1️⃣ Create Protest/Appeal entry
     const entry = await this.protestAppealModel.create({
       caseId: dto.caseId,
       doDate: new Date(dto.doDate),
       description: dto.description,
       deadline: new Date(dto.deadline),
       status: dto.status,
       outcome: dto.outcome,
       notes: dto.notes,
       createdBy: new Types.ObjectId(userId),
     });
 
     // 2️⃣ Auto-create Task for Deadline
     const task = await this.taskModel.create({
       caseId: dto.caseId,
       taskTitle: `Deadline: ${dto.description}`,
       internalNotes: `Protest/Appeal deadline on ${dto.deadline}`,
       assignedTo: caseDoc.assignedManager,
       deadline: new Date(dto.deadline),
       status: 'Pending',
       priority: 'High',
       taskType: 'Order Review',
       linkToCalendar: true,
       sourceModule: 'ProtestAppeal',
       sourceId: entry._id,
       createdBy: new Types.ObjectId(userId),
     });
 
     entry.linkedTaskId = task._id;
 
     // 3️⃣ Auto-create Calendar Event
     const event = await this.eventModel.create({
       caseId: dto.caseId,
       title: `Protest Deadline`,
       eventType: 'Protest/Appeal',
       eventDate: new Date(dto.deadline),
       status: 'Pending',
       createdBy: new Types.ObjectId(userId),
     });
 
     entry.linkedEventId = event._id;
 
     await entry.save();
 
     caseDoc.lastActivity = 'Protest/Appeal added';
     await caseDoc.save();
 
     return new ApiResponse(201, entry, Msg.PROTEST_APPEAL_CREATED);
   } catch (error) {
    console.log(`error while creating case message: ${error}`);
    return new ApiResponse(500, {}, Msg.SERVER_ERROR);
   }
  }
}
