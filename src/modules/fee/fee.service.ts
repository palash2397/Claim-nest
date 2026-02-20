import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { Fee, FeeDocument } from './schemas/fee.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { CreateFeeDto } from './dto/create-fee.dto';
import { UpdateFeeDto } from './dto/update-fee.dto';
import { FilterFeeDto } from './dto/filter-fee.dto';

@Injectable()
export class FeeService {
  constructor(
    @InjectModel(Fee.name)
    private feeModel: Model<FeeDocument>,
    @InjectModel(Case.name)
    private caseModel: Model<CaseDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateFeeDto, userId: string) {
    try {
      //   const caseDoc= await this.caseModel.findById(dto.caseId);
      //   if(!caseDoc) {
      //     return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      //   }

      const userDoc = await this.userModel.findById(userId);
      if (!userDoc) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }

      const obj = {
        ...dto,
        createdBy: userId,
      };

      const fee = await this.feeModel.create(obj);
      return new ApiResponse(201, fee, Msg.FEE_CREATED);
    } catch (error) {
      console.log(`error while creating fee`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: UpdateFeeDto) {
    try {
      const updated = await this.feeModel.findByIdAndUpdate(dto.id, dto, {
        new: true,
      });

      if (!updated) {
        return new ApiResponse(404, {}, Msg.FEE_NOT_FOUND);
      }

      return new ApiResponse(200, updated, Msg.FEE_UPDATED);
    } catch (error) {
      console.log(`error while updating fee`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const fee = await this.feeModel
        .findById(id)
        .populate('createdBy', 'name email');
      if (!fee) {
        return new ApiResponse(404, {}, Msg.FEE_NOT_FOUND);
      }
      return new ApiResponse(200, fee, Msg.FEE_FETCHED);
    } catch (error) {
      console.log(`error while finding fee`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findAll(filter: FilterFeeDto) {
    try {
      const query: any = {};

      if (filter.agreement) query.agreement = filter.agreement;
      if (filter.paymentMethod) query.paymentMethod = filter.paymentMethod;
      if (filter.timeLoss) query.timeLoss = filter.timeLoss;
      if (filter.status) query.status = filter.status;

      const fees = await this.feeModel
        .find(query)
        .sort({ createdAt: -1 })
        .populate('createdBy', 'name email');

      if (!fees || fees.length === 0) {
        return new ApiResponse(404, {}, Msg.FEE_NOT_FOUND);
      }
      return new ApiResponse(200, fees, Msg.FEES_LIST_FETCHED);
    } catch (error) {
      console.log(`error while finding all fees`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const fee = await this.feeModel.findByIdAndDelete(id);
      if (!fee) {
        return new ApiResponse(404, {}, Msg.FEE_NOT_FOUND);
      }
      return new ApiResponse(200, {}, Msg.FEE_DELETED);
    } catch (error) {
      console.log(`error while deleting fee`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async calendarData(start: Date, end: Date) {
    try {
      const data = await this.feeModel.find({
        nextDueDate: {
          $gte: start,
          $lte: end,
        },
      });

      if (!data || data.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      return new ApiResponse(200, data, Msg.FEE_FETCHED);
    } catch (error) {   
      console.log(`error while getting calendar data`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
    // return this.feeModel.find({
    //   nextDueDate: {
    //     $gte: start,
    //     $lte: end,
    //   },
    // });
  }
}
