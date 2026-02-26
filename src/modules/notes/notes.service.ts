import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { Note, NoteDocument } from './schemas/create-note.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Task, TaskDocument } from '../task/schemas/task.schema';

import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    @InjectModel(Case.name) private caseModel: Model<CaseDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async create(dto: CreateNoteDto, userId: string) {
    try {
      const caseDoc = await this.caseModel.findById(dto.caseId);

      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      // 1️⃣ Create Note
      const note = await this.noteModel.create({
        caseId: dto.caseId,
        noteType: dto.noteType,
        visibility: dto.visibility,
        title: dto.title,
        details: dto.details,
        createdBy: new Types.ObjectId(userId),
      });

      let createdTask: TaskDocument | null = null;

      // 2️⃣ If Create Task Checked
      if (dto.createTask) {
        const assignToUser = await this.userModel.findById(dto.assignTo);
        if (!assignToUser) {
          return new ApiResponse(404, {}, Msg.ASSIGN_TO_USER_NOT_FOUND);
        }

        createdTask = await this.taskModel.create({
          caseId: dto.caseId,
          taskTitle: dto.taskTitle,
          internalNotes: dto.details,
          assignedTo: dto.assignTo,
          status: 'Pending',
          priority: dto.priority,
          taskType: dto.taskType,
          linkToCalendar: dto.linkToCalendar,
          sourceModule: 'Note',
          sourceId: note._id,
          createdBy: new Types.ObjectId(userId),
        });

        // Link Task to Note
        note.linkedTaskId = createdTask._id;
        await note.save();
      }

      // 3️⃣ Update Case Summary
      caseDoc.lastActivity = `Note added: ${dto.title}`;
      await caseDoc.save();

      return new ApiResponse(
        201,
        { note, task: createdTask },
        Msg.NOTE_CREATED,
      );
    } catch (error) {
      console.log(`error while creating note: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const note = await this.noteModel
        .find({ caseId: id })
        .populate('createdBy', 'firstName lastName')
        .populate('caseId', 'caseId');
      if (!note || note.length === 0) {
        return new ApiResponse(404, {}, Msg.NOTE_NOT_FOUND);
      }

      return new ApiResponse(200, note, Msg.NOTE_FETCHED);
    } catch (error) {
      console.log(`error while finding note: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
