import { Injectable } from '@nestjs/common';
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
    if(!userDoc) {
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

  async update(dto: UpdateFeeDto){
    try {
        
    } catch (error) {
        console.log(`error while updating fee`, error);
        return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
