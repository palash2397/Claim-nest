import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { TimeLoss, TimeLossDocument } from './schemas/time-loss.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { CreateTimeLossDto } from './dto/create-time-loss.dto';
import { UpdateTimeLossDto } from './dto/update-time-loss.dto';

@Injectable()
export class TimeLossService {
  constructor(
    @InjectModel(TimeLoss.name)
    private timeLossModel: Model<TimeLossDocument>,
    @InjectModel(Case.name)
    private caseModel: Model<CaseDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateTimeLossDto, userId: string) {
    try {
      if (dto.caseId) {
        const caseDoc = await this.caseModel.findById(dto.caseId);
        if (!caseDoc) {
          return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
        }
      }

      const entry = await this.timeLossModel.create({
        ...dto,
        date: new Date(dto.date),
        caseId: dto.caseId,
        createdBy: new Types.ObjectId(userId),
      });

      return new ApiResponse(201, entry, Msg.TIME_LOSS_CREATED);
    } catch (error) {
      console.error('Error creating time loss:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: UpdateTimeLossDto, userId: string) {
    try {
      const updateData: any = {
        ...dto,
        updatedBy: new Types.ObjectId(userId),
      };

      if (dto.date) {
        updateData.date = new Date(dto.date);
      }

      const entry = await this.timeLossModel.findByIdAndUpdate(
        dto.id,
        updateData,
        { new: true },
      );

      return new ApiResponse(200, entry, Msg.TIME_LOSS_UPDATED);
    } catch (error) {
      console.error('Error updating time loss:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      const entry = await this.timeLossModel.findByIdAndDelete(id);
      if (!entry) {
        return new ApiResponse(404, {}, Msg.TIME_LOSS_NOT_FOUND);
      }
      return new ApiResponse(200, entry, Msg.TIME_LOSS_DELETED);
    } catch (error) {
      console.error('Error deleting time loss:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const entry = await this.timeLossModel.findById(id);
      if (!entry) {
        return new ApiResponse(404, {}, Msg.TIME_LOSS_NOT_FOUND);
      }
      return new ApiResponse(200, entry, Msg.TIME_LOSS_FETCHED);
    } catch (error) {
      console.error('Error finding time loss:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
