import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';


import { Message, MessageDocument } from './schemas/message.schema';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';   

@Injectable()
export class MessageService {
    constructor(
        @InjectModel('Message') private messageModel: Model<MessageDocument>,
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('Case') private caseModel: Model<CaseDocument>,
    ) {}
}
