import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';
import { AwsService } from '../aws/aws.service';

import {
  DocumentFile,
  DocumentFileDocument,
} from './schemas/create-document.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';

import { AddDocumentDto } from './dto/create-document.dto';

@Injectable()
export class CaseDocumentsService {
  constructor(
    @InjectModel(Case.name) private readonly caseModel: Model<CaseDocument>,
    @InjectModel(DocumentFile.name)
    private readonly documentFileModel: Model<DocumentFileDocument>,
    private readonly awsService: AwsService,
  ) {}

  async upload(dto: AddDocumentDto, userId: string, file: Express.Multer.File) {
    try {
      const caseDoc = await this.caseModel.findById(dto.caseId);

      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      // Upload to S3 (later replace with real service)
      const uploadResult = await this.awsService.uploadFile(
        `cases/${dto.caseId}/${Date.now()}-${file.originalname}`,
        file.buffer,
        file.mimetype,
      );

      const doc = await this.documentFileModel.create({
        caseId: dto.caseId,
        fileName: file.originalname,
        fileUrl: uploadResult.Location,
        category: dto.category,
        description: dto.description,
        uploadedBy: new Types.ObjectId(userId),
      });

      caseDoc.lastActivity = 'Document uploaded';
      await caseDoc.save();

      return new ApiResponse(200, doc, Msg.DATA_ADDED);
    } catch (error) {
      console.log(`error while uploading document: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findByCaseId(id: string){
    try {
        const docs = await this.documentFileModel.find({caseId: id});
        if (!docs || docs.length === 0) {
            return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
        }

        for (const doc of docs) {
            doc.fileUrl = await this.awsService.getSignedFileUrl(doc.fileUrl);
        }
        return new ApiResponse(200, docs, Msg.SUCCESS);
    } catch (error) {
        console.log(`error while finding documents: ${error}`);
        return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
