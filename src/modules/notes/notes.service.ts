import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { Note, NoteDocument } from './schemas/create-note.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    @InjectModel(Case.name) private caseModel: Model<CaseDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateNoteDto, userId: string) {
    try {
      const caseDoc = await this.caseModel.findById(dto.caseId);

      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      const note = await this.noteModel.create({
        caseId: dto.caseId,
        noteType: dto.noteType,
        visibility: dto.visibility,
        title: dto.title,
        details: dto.details,
        createdBy: new Types.ObjectId(userId),
      });

      // Update case summary
      caseDoc.lastActivity = `Note added: ${dto.title}`;
      await caseDoc.save();


      return new ApiResponse(201, note, Msg.NOTE_CREATED);
    } catch (error) {
       console.log(`error while creating note: ${error}`);
       return new ApiResponse(500,{}, Msg.SERVER_ERROR)
    }
  }
}
