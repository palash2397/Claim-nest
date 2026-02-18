
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';


import { CaseContact, CaseContactDocument } from './schemas/case-contact.schema';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';


import { CreateCaseContactDto } from './dto/create-case-contact.dto';

@Injectable()
export class CaseContactService {
    constructor(
        @InjectModel(CaseContact.name) private caseContactModel: Model<CaseContactDocument>,
        @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
        @InjectModel(Case.name) private caseModel: Model<CaseDocument>,
    ) {}


    async create(dto: CreateCaseContactDto) {
       const caseDoc = await this.caseModel.findById(dto.caseId);
       if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
       }
        
    }
}
