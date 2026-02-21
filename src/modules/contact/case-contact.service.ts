import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import {
  CaseContact,
  CaseContactDocument,
} from './schemas/case-contact.schema';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';

import { CreateCaseContactDto } from './dto/create-case-contact.dto';

@Injectable()
export class CaseContactService {
  constructor(
    @InjectModel(CaseContact.name)
    private caseContactModel: Model<CaseContactDocument>,
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    @InjectModel(Case.name) private caseModel: Model<CaseDocument>,
  ) {}

  async create(dto: CreateCaseContactDto) {
    try {
      const caseDoc = await this.caseModel.findById(dto.caseId);
      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      const contactDoc = await this.contactModel.findById(dto.contactId);
      if (!contactDoc) {
        return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
      }

      //    // Check if contact is already associated with this case
      //    const existingCaseContact = await this.caseContactModel.findOne({
      //     caseId: caseDoc._id,
      //     contactId: contactDoc._id
      //    });

      //    if (existingCaseContact) {
      //     return new ApiResponse(400, {}, Msg.CASE_CONTACT_ALREADY_EXISTS);
      //    }

      // Create new case contact
      const caseContact = new this.caseContactModel({
        caseId: new Types.ObjectId(dto.caseId),
        contactId: new Types.ObjectId(dto.contactId),
        roleOnCase: dto.roleOnCase,
        isPrimary: dto.isPrimary || false,
        caseNotes: dto.caseNotes,
      });

      await caseContact.save();

      return new ApiResponse(201, caseContact, Msg.CONTACT_CREATED);
    } catch (error) {
      console.error('Error creating case contact:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async contactByCaseId(caseId: string) {
    try {
      const caseDoc = await this.caseModel.findById(caseId);
      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.CASE_NOT_FOUND);
      }

      console.log('caseDoc', caseDoc);

      const caseContact = await this.caseContactModel
        .find({
          caseId: new mongoose.Types.ObjectId(caseId),
        })
        .populate('contactId', 'firstName lastName email phone');
      console.log('caseContact', caseContact);
      if (!caseContact || caseContact.length === 0) {
        return new ApiResponse(404, {}, Msg.CASE_CONTACT_NOT_FOUND);
      }
      return new ApiResponse(200, caseContact, Msg.CASE_CONTACT_FETCHED);
    } catch (error) {
      console.error('Error fetching contact by case:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const caseContact = await this.caseContactModel.findByIdAndDelete(id);
      if (!caseContact) {
        return new ApiResponse(404, {}, Msg.CASE_CONTACT_NOT_FOUND);
      }
      return new ApiResponse(200, {}, Msg.CASE_CONTACT_DELETED);
    } catch (error) {
      console.error('Error deleting case contact:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async all() {
    try {
      const caseContact = await this.caseContactModel
        .find()
        .populate('contactId', 'firstName lastName email phone')
        .populate('caseId', 'caseId');
      if (!caseContact || caseContact.length === 0) {
        return new ApiResponse(404, {}, Msg.CASE_CONTACT_NOT_FOUND);
      }
      return new ApiResponse(200, caseContact, Msg.CASE_CONTACT_FETCHED);
    } catch (error) {
      console.error('Error fetching all case contacts:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
