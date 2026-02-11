import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { Contact, ContactDocument } from './schemas/contact.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<ContactDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateContactDto, userId: string) {
    try {
      const user = this.userModel.findById(dto.assignedTo);
      if (!user) {
        return new ApiResponse(404, {}, Msg.ASSIGNED_USER_NOT_FOUND);
      }

      const data = {
        ...dto,
        createdBy: new Types.ObjectId(userId),
      };

      return new ApiResponse(201, data, Msg.CONTACT_CREATED);
    } catch (error) {
      console.log('Error creating contact:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: UpdateContactDto, userId: string) {
    try {
      const contact = this.contactModel.findById(dto.id);
      if (!contact) {
        return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
      }

      const data = {
        ...dto,
        updatedBy: new Types.ObjectId(userId),
      };

      return new ApiResponse(200, data, Msg.CONTACT_UPDATED);
    } catch (error) {
      console.log('Error updating contact:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const contact = this.contactModel.findById(id);
      if (!contact) {
        return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
      }

      return new ApiResponse(200, contact, Msg.CONTACT_FETCHED);
    } catch (error) {
      console.log('Error finding contact:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const contacts = await this.contactModel.find();
      if (!contacts || contacts.length === 0) {
        return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
      }
      return new ApiResponse(200, contacts, Msg.CONTACT_LIST_FETCHED);
    } catch (error) {
      console.log('Error finding contacts:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async delete(id: string){
    try {
      const contact = this.contactModel.findByIdAndDelete(id);
      if (!contact) {
        return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
      }
      return new ApiResponse(200, contact, Msg.CONTACT_DELETED);
    } catch (error) {
       console.log('Error deleting contact:', error);
       return new ApiResponse(500, {}, Msg.SERVER_ERROR);
      
    }

  }
}
