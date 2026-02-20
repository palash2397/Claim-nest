import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { Fee, FeeDocument } from './schemas/fee.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';

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
  ) {}


  async create(dto: CreateFeeDto, userId: string) {
    try {
    //   const caseDoc= await this.caseModel.findById(dto.caseId);
    //   if(!caseDoc) {
    //     return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
    //   }

    
        
    } catch (error) {
        console.log(`error while creating fee`, error);
        return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
    
  }
}
