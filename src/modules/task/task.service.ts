import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { Task, TaskDocument } from './schemas/task.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskDocument>,
    @InjectModel('Case') private readonly caseModel: Model<CaseDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateTaskDto, userId: string) {
    try {
      const caseDoc = await this.caseModel.findById(dto.caseId);
      if (!caseDoc) {
        return new ApiResponse(404, false, Msg.DATA_NOT_FOUND);
      }

      const userDoc = await this.userModel.findById(dto.assignedTo);
      console.log(userDoc);
      if (!userDoc) {
        return new ApiResponse(404, {}, Msg.ASSIGNED_USER_NOT_FOUND);
      }

      const task = await this.taskModel.create({
        ...dto,
        createdBy: new mongoose.Types.ObjectId(userId),
      });

      return new ApiResponse(201, task, Msg.TASK_CREATED);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: UpdateTaskDto, userId: string) {
  try {
      const task = await this.taskModel.findById(dto.id);
  
      if (!task) {
        return new ApiResponse(404, {}, Msg.TASK_NOT_FOUND);
      }
  
      task.taskTitle = dto.taskTitle || task.taskTitle;
      task.internalNotes = dto.internalNotes || task.internalNotes;
      task.status = dto.status || task.status;
      task.callRecipient = dto.callRecipient || task.callRecipient;
      task.callReason = dto.callReason || task.callReason;
      task.callStatus = dto.callStatus || task.callStatus;
      task.caseId = new mongoose.Types.ObjectId(dto.caseId || task.caseId.toString());
    //   task.deadline = dto.deadline || task.deadline;
      task.assignedTo = new mongoose.Types.ObjectId(dto.assignedTo || task.assignedTo.toString());
      task.updatedBy = new mongoose.Types.ObjectId(userId);
  
      await task.save();
  
      return new ApiResponse(200, task, Msg.TASK_UPDATED);
  } catch (error) {
    console.log(`Error updating task: ${error}`);
    return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    
  }
  }

  async findAll() {
    try {
      const tasks = await this.taskModel
        .find()
        .populate('caseId', 'caseId clientName')
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email');

      if (!tasks || tasks.length === 0) {
        return new ApiResponse(404, {}, Msg.TASK_NOT_FOUND);
      }
      return new ApiResponse(200, tasks, Msg.TASK_LIST_FETCHED);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async taskById(id: string) {
    try {
      const task = await this.taskModel
        .findById(id)
        .populate('caseId', 'caseId clientName')
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email');
      if (!task) {
        return new ApiResponse(404, {}, Msg.TASK_NOT_FOUND);
      }
      return new ApiResponse(200, task, Msg.TASK_FETCHED);
    } catch (error) {
      console.log(`Error fetching task by ID: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
  
  async delete(id: string) {
    try {
      const task = await this.taskModel.findByIdAndDelete(id);
      if (!task) {
        return new ApiResponse(404, {}, Msg.TASK_NOT_FOUND);
      }
      return new ApiResponse(200, {}, Msg.TASK_DELETED);
    } catch (error) {
      console.log(`Error deleting task: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async recentTasks() {
    try {
      const tasks = await this.taskModel
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('caseId', 'caseId clientName')
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email');

      if (!tasks || tasks.length === 0) {
        return new ApiResponse(404, {}, Msg.TASK_NOT_FOUND);
      }
      return new ApiResponse(200, tasks, Msg.TASK_LIST_FETCHED);
    } catch (error) {
      console.log(`Error fetching recent tasks: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
