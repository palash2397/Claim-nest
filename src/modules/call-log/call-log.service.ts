import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { CallLog, CallLogDocument } from './schemas/callLog.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class CallLogService {
  constructor(
    @InjectModel('CallLog')
    private readonly callLogModel: Model<CallLogDocument>,
    @InjectModel('Case')
    private readonly caseModel: Model<CaseDocument>,
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}
}
