import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';
import { AwsService } from '../aws/aws.service';

import { Case, CaseDocument } from './schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { CaseCounter, CaseCounterDocument } from './schemas/case-counter.schema';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { AddActivityDto } from './dto/add-activity.dto';
import { AddNoteDto } from './dto/add-note.dto';
import { AddMessageCallDto } from './dto/add-message.dto';
import { AddTimeLossDto } from './dto/add-time-loss.dto';
import { AddProtestAppealDto } from './dto/add-protest-appeal.dto';
import { AddDocumentDto } from './dto/add-document.dto';

@Injectable()
export class CaseService {
  constructor(
    @InjectModel('Case') private readonly caseModel: Model<CaseDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    @InjectModel('CaseCounter')
    private readonly caseCounterModel: Model<CaseCounterDocument>,
    private readonly awsService: AwsService,
  ) {}

  private async getNextCaseId(): Promise<string> {
    const counter = await this.caseCounterModel.findOneAndUpdate(
      { name: 'case' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    return `C-${counter.seq}`;
  }

  async create(dto: CreateCaseDto, id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }

      const caseId = await this.getNextCaseId();
      const caseDoc = await this.caseModel.create({
        ...dto,
        caseId,
        status: dto.status || 'Intake',
        auditLogs: [
          {
            action: 'created',
            performedBy: new mongoose.Types.ObjectId(id),
            performedAt: new Date(),
          },
        ],
      });

      const caseData = await caseDoc.save();
      return new ApiResponse(201, caseData, Msg.DATA_ADDED);
    } catch (error) {
      console.log('Error creating case:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: UpdateCaseDto, userId: string, caseId: string) {
    try {
      const caseDoc = await this.caseModel.findById(caseId);
      console.log('caseDoc', caseDoc);
      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }

      Object.keys(dto).forEach((field) => {
        caseDoc.auditLogs.push({
          action: 'updated',
          field,
          oldValue: String(caseDoc[field]),
          newValue: String(dto[field]),
          performedBy: new mongoose.Types.ObjectId(userId),
          performedAt: new Date(),
        });

        caseDoc[field] = dto[field];
      });

      await caseDoc.save();
      return new ApiResponse(200, caseDoc, Msg.DATA_UPDATED);
    } catch (error) {
      console.log('Error updating case:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async addActivity(caseId: string, dto: AddActivityDto, userId: string) {
    const caseDoc = await this.caseModel.findById(caseId);

    if (!caseDoc) {
      return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
    }

    caseDoc.activityLogs.push({
      activity: dto.activity,
      createdBy: userId,
      createdAt: new Date(),
    });

    caseDoc.auditLogs.push({
      action: 'added',
      field: 'activity',
      newValue: dto.activity,
      performedBy: new mongoose.Types.ObjectId(userId),
      performedAt: new Date(),
    });

    await caseDoc.save();
    return new ApiResponse(200, {}, Msg.ACTIVITY_ADDED);
  }

  async addNote(caseId: string, dto: AddNoteDto, userId: string) {
    const caseDoc = await this.caseModel.findById(caseId);

    if (!caseDoc) return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);

    caseDoc.notes.push({
      note: dto.note,
      createdBy: userId,
      createdAt: new Date(),
    });

    caseDoc.auditLogs.push({
      action: 'added',
      field: 'note',
      newValue: dto.note,
      performedBy: new mongoose.Types.ObjectId(userId),
      performedAt: new Date(),
    });

    await caseDoc.save();
    return new ApiResponse(200, {}, Msg.NOTE_ADDED);
  }

  async addMessageCall(caseId: string, dto: AddMessageCallDto, userId: string) {
    const caseDoc = await this.caseModel.findById(caseId);

    if (!caseDoc) {
      return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
    }

    caseDoc.messagesAndCalls.push({
      ...dto,
      createdBy: new mongoose.Types.ObjectId(userId),
      createdAt: new Date(),
    });

    caseDoc.auditLogs.push({
      action: 'added',
      field: 'messagesAndCalls',
      newValue: `${dto.from} → ${dto.regarding}`,
      performedBy: new mongoose.Types.ObjectId(userId),
      performedAt: new Date(),
    });

    await caseDoc.save();
    return new ApiResponse(200, {}, Msg.MESSAGE_ADDED);
  }

  async addTimeLoss(caseId: string, dto: AddTimeLossDto, userId: string) {
    const caseDoc = await this.caseModel.findById(caseId);

    if (!caseDoc) {
      return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
    }

    caseDoc.timeLosses.push({
      fromDate: new Date(dto.fromDate),
      toDate: new Date(dto.toDate),
      payPeriod: dto.payPeriod,
      description: dto.description,
      createdBy: new mongoose.Types.ObjectId(userId),
      createdAt: new Date(),
    });

    // 🔐 AUDIT LOG (CLIENT REQUIREMENT)
    caseDoc.auditLogs.push({
      action: 'added',
      field: 'timeLoss',
      newValue: `${dto.fromDate} → ${dto.toDate}`,
      performedBy: new mongoose.Types.ObjectId(userId),
      performedAt: new Date(),
    });

    await caseDoc.save();

    return new ApiResponse(200, {}, Msg.TIME_LOSS_ADDED);
  }

  async addProtestAppeal(
    caseId: string,
    dto: AddProtestAppealDto,
    userId: string,
  ) {
    const caseDoc = await this.caseModel.findById(caseId);

    if (!caseDoc) {
      return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
    }

    caseDoc.protestsAndAppeals = {
      doDate: new Date(dto.doDate),
      description: dto.description || '',
      deadline: new Date(dto.deadline),
      status: dto.status,
      outcome: dto.outcome || '',
      notes: dto.notes || '',
      createdBy: new mongoose.Types.ObjectId(userId),
      createdAt: new Date(),
    };

    // 🔐 AUDIT LOG
    caseDoc.auditLogs.push({
      action: 'updated',
      field: 'protestsAndAppeals',
      newValue: dto.status,
      performedBy: new mongoose.Types.ObjectId(userId),
      performedAt: new Date(),
    });

    await caseDoc.save();

    return new ApiResponse(200, {}, Msg.PROTEST_APPEAL_ADDED);
  }

  async caseByCaseId(caseId: string) {
    const caseDoc = await this.caseModel.findOne({ caseId: caseId });
    if (!caseDoc) {
      return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
    }

    caseDoc.clientName;

    let obj = {
      id: caseDoc._id,
      name: caseDoc.clientName,
      caseId: caseDoc.caseId,
    };

    return new ApiResponse(200, obj, Msg.DATA_FETCHED);
  }

  async addDocument(
    dto: AddDocumentDto,
    userId: string,
    file: Express.Multer.File,
  ) {
    try {
      const caseDoc = await this.caseModel.findById(dto.caseId);

      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }

      // 1️⃣ Upload to S3
      const s3Key = `case/documents/${Date.now()}-${file.originalname}`;

      const uploadResult = await this.awsService.uploadFile(
        s3Key,
        file.buffer,
        file.mimetype,
      );

      // 2️⃣ Save metadata + S3 info
      caseDoc.documents.push({
        fileName: s3Key.split('/').pop() || '',
        originalName: file.originalname,
        category: dto.category,
        mimeType: file.mimetype,
        size: file.size,

        fileUrl: uploadResult.Location, // 🔥 IMPORTANT
        s3Key,

        uploadedBy: new mongoose.Types.ObjectId(userId),
        uploadedAt: new Date(),
      });

      // 3️⃣ Audit log
      caseDoc.auditLogs.push({
        action: 'added',
        field: 'documents',
        newValue: file.originalname,
        performedBy: new mongoose.Types.ObjectId(userId),
        performedAt: new Date(),
      });

      await caseDoc.save();

      return new ApiResponse(200, {}, Msg.DOCUMENT_ADDED);
    } catch (error) {
      console.log(`Error adding document: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async caseIdAndId() {
    try {
      const cases = await this.caseModel.find({}, { caseId: 1});
      if (!cases) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      return new ApiResponse(200, cases, Msg.DATA_FETCHED);
    } catch (error) {
      console.log(`Error fetching case IDs and names: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async allCases() {
    try {
      const cases = await this.caseModel.find();

      if (!cases || cases.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      
      // Add signed URLs for documents
      for await (const caseDoc of cases) {
        if (caseDoc.documents && caseDoc.documents.length > 0) {
          for await (const doc of caseDoc.documents) {
            if (doc.s3Key) {
              doc.signedUrl = await this.awsService.getSignedFileUrl(doc.s3Key);
            }
          }
        }
      }
      
    
   
      return new ApiResponse(200, cases, Msg.DATA_FETCHED);
    } catch (error) {
      console.log(`Error fetching all cases: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async caseById(caseId: string) {
    try {
      const caseDoc = await this.caseModel.findById(caseId);
      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      
      // Add signed URLs for documents
      if (caseDoc.documents && caseDoc.documents.length > 0) {
        for await (const doc of caseDoc.documents) {
          if (doc.s3Key) {
            doc.signedUrl = await this.awsService.getSignedFileUrl(doc.s3Key);
          }
        }
      }
      
      return new ApiResponse(200, caseDoc, Msg.DATA_FETCHED);
    } catch (error) {
      console.log(`Error fetching case by ID: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  
}
