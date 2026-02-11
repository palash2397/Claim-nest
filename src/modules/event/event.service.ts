import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Case, CaseDocument } from '../case/schemas/case.schema';
import { User, UserDocument } from '../user/schemas/user.schema';

import { ApiResponse } from 'src/utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FilterEventDto } from './dto/filter-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<EventDocument>,
    @InjectModel('Case') private readonly caseModel: Model<CaseDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateEventDto) {
    try {
      const user = await this.userModel.findById(dto.roleUserId);
      if (!user) {
        return new ApiResponse(404, {}, Msg.ASSIGNED_USER_NOT_FOUND);
      }

      const caseDoc = await this.caseModel.findById(dto.caseId);
      if (!caseDoc) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }

      const event = new this.eventModel(dto);
      const savedEvent = await event.save();

      return new ApiResponse(201, savedEvent, Msg.EVENT_CREATED);
    } catch (error) {
      console.log(`Error creating event: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: UpdateEventDto, userId: string) {
    try {
      // const event = await this.eventModel.findById(dto.id);
      // if (!event) {
      //   return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      // }

      // // Update the event with the new data
      const updatedEvent = await this.eventModel.findByIdAndUpdate(
        dto.id,
        {
          ...dto,
          updatedBy: new Types.ObjectId(userId),
        },
        { new: true },
      );

      if (!updatedEvent) {
        return new ApiResponse(404, {}, Msg.EVENT_NOT_FOUND);
      }

      return new ApiResponse(200, updatedEvent, Msg.EVENT_UPDATED);
    } catch (error) {
      console.log(`Error updating event: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const events = await this.eventModel
        .find()
        .populate('caseId', 'caseId clientName')
        .populate('roleUserId', `name email role`)
        .populate('updatedBy', `name email role`);
      if (!events || events.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }

      return new ApiResponse(200, events, Msg.EVENT_FETCHED);
    } catch (error) {
      console.log(`Error fetching events: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const event = await this.eventModel
        .findById(id)
        .populate('caseId', 'caseId clientName')
        .populate('roleUserId', `name email role`)
        .populate('updatedBy', `name email role`);
      if (!event) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      return new ApiResponse(200, event, Msg.EVENT_FETCHED);
    } catch (error) {
      console.log(`Error fetching event: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async delete(id: string) {
    try {
      const event = await this.eventModel.findByIdAndDelete(id);
      if (!event) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      return new ApiResponse(200, {}, Msg.EVENT_DELETED);
    } catch (error) {
      console.log(`Error deleting event: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async findByFilter(filters: FilterEventDto) {
    try {
      const query: any = {};

      if (filters.caseId) {
        query.caseId = filters.caseId;
      }

      if (filters.eventType) {
        query.eventType = filters.eventType;
      }

      if (filters.status) {
        query.status = filters.status;
      }

      const data = await this.eventModel
        .find(query)
        .populate('caseId', 'caseId clientName')
        .populate('roleUserId', 'name email role')
        .sort({ eventDate: 1 });

      if (!data || data.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }

      return new ApiResponse(200, data, Msg.EVENT_FETCHED);
    } catch (error) {
      console.log(`Error fetching events: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
