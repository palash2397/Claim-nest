import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { TimeLoss, TimeLossDocument } from './schemas/case-time-loss.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { AwsService } from '../aws/aws.service';

import { CreateTimeLossDto } from './dto/create-time-loss.dto';

@Injectable()
export class CaseTimeLossService {
  constructor(
    @InjectModel(TimeLoss.name)
    private readonly timeLossModel: Model<TimeLossDocument>,
    @InjectModel(Case.name)
    private readonly caseModel: Model<CaseDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly awsService: AwsService,
  ) {}

  async create(
    dto: CreateTimeLossDto,
    userId: string,
    file: Express.Multer.File,
  ) {
    try {
      const caseDoc = await this.caseModel.findById(dto.caseId);

      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      let posData: {
        fileName: string;
        fileUrl: string;
        uploadedAt: Date;
        uploadedBy: Types.ObjectId;
      }[] = [];

      if (file) {
        const uploadResult = await this.awsService.uploadFile(
          `case/time-loss/pos/${Date.now()}-${file.originalname}`,
          file.buffer,
          file.mimetype,
        );

        posData.push({
          fileName: file.originalname,
          fileUrl: uploadResult.Location,
          uploadedAt: new Date(),
          uploadedBy: new Types.ObjectId(userId),
        });
      }

      const entry = await this.timeLossModel.create({
        caseId: dto.caseId,
        payPeriodStart: new Date(dto.payPeriodStart),
        payPeriodEnd: new Date(dto.payPeriodEnd),
        grossAmount: dto.grossAmount,
        legalFee: dto.legalFee,
        totalToClient: dto.totalToClient,
        checkNumber: dto.checkNumber,
        receivedDate: dto.receivedDate ? new Date(dto.receivedDate) : undefined,
        disbursedDate: dto.disbursedDate
          ? new Date(dto.disbursedDate)
          : undefined,
        notes: dto.notes,

        pos: posData,
        createdBy: new Types.ObjectId(userId),
      });

      caseDoc.lastActivity = 'Time Loss entry added';
      await caseDoc.save();

      return new ApiResponse(201, entry, Msg.TIME_LOSS_ADDED);
    } catch (error) {
      console.error('Error creating time loss entry:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const message = await this.timeLossModel
        .find({ caseId: id })
        .populate('caseId', 'caseId')
        .populate('createdBy', 'name');
      if (!message || message.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }

      for (const item of message) {
        for (const posItem of item.pos) {
          posItem.fileUrl = await this.awsService.getSignedFileUrl(posItem.fileUrl);
        }
      }
      return new ApiResponse(200, message, Msg.SUCCESS);
    } catch (error) {
      console.log(`error while finding case message: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
