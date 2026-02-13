import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { TimeLoss, TimeLossDocument } from './schemas/case-time-loss.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class CaseTimeLossService {
    constructor(
        @InjectModel(TimeLoss.name)
        private readonly timeLossModel: Model<TimeLossDocument>,
        @InjectModel(Case.name)
        private readonly caseModel: Model<CaseDocument>,
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}
}
