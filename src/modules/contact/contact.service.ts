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
    @InjectModel('Contact')
    private contactModel: Model<ContactDocument>,
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateContactDto, userId: string) {
    try {
      const data = {
        ...dto,
        createdBy: new Types.ObjectId(userId),
      };
      const contact = await this.contactModel.create(data);

      return new ApiResponse(201, contact, Msg.CONTACT_CREATED);
    } catch (error) {
      console.log('Error creating contact:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: UpdateContactDto, userId: string) {
    try {
      // const event = await this.eventModel.findById(dto.id);
      // if (!event) {
      //   return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      // }

      // // Update the event with the new data
      const updatedData = await this.contactModel.findByIdAndUpdate(
        dto.id,
        {
          ...dto,
          updatedBy: new Types.ObjectId(userId),
        },
        { new: true },
      );

      if (!updatedData) {
        return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
      }

      return new ApiResponse(200, updatedData, Msg.CONTACT_UPDATED);
    } catch (error) {
      console.log(`Error updating contact: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      console.log('id', id);
      const contact = await this.contactModel
        .findById(id)
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
      const contacts = await this.contactModel
        .find()
        .sort({ createdAt: -1 });
      if (!contacts || contacts.length === 0) {
        return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
      }
      return new ApiResponse(200, contacts, Msg.CONTACT_LIST_FETCHED);
    } catch (error) {
      console.log('Error finding contacts:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      const contact = await this.contactModel.findByIdAndDelete(id);
      if (!contact) {
        return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
      }
      return new ApiResponse(200, contact, Msg.CONTACT_DELETED);
    } catch (error) {
      console.log('Error deleting contact:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async getKanban() {
    try {
      const contacts = await this.contactModel
        .find()
        .sort({ createdAt: -1 });

      if (!contacts || contacts.length === 0) {
        return new ApiResponse(404, {}, Msg.CONTACTS_NOT_FOUND);
      }

      const grouped: {
        New: any[];
        Active: any[];
        FollowUp: any[];
        Closed: any[];
      } = {
        New: [],
        Active: [],
        FollowUp: [],
        Closed: [],
      };

      for (const item of contacts) {
        if (['Potential', 'Inquiry'].includes(item.status)) {
          grouped.New.push(item);
        } else if (item.status === 'Client') {
          grouped.Active.push(item);
        } else if (item.status === 'Callback') {
          grouped.FollowUp.push(item);
        } else if (item.status === 'Closed') {
          grouped.Closed.push(item);
        }
      }

      return new ApiResponse(200, grouped, Msg.CONTACT_LIST_FETCHED);
    } catch (error) {
      console.log('Error finding contacts:', error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
    // return grouped;
  }

  async filterByAll(status?: string, search?: string) {
    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const data = await this.contactModel
      .find(filter)
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 });
    
    if (!data || data.length === 0) {
      return new ApiResponse(404, {}, Msg.CONTACT_NOT_FOUND);
    }

    return new ApiResponse(200, data, Msg.CONTACT_LIST_FETCHED);
  }
}
