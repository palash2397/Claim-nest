import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { Client, ClientDocument } from './schemas/client.schema';

import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<ClientDocument>,
  ) {}

  async create(dto: CreateClientDto) {
    try {
      const client = await this.clientModel.create(dto);
      if (!client) {
        return new ApiResponse(400, {}, Msg.CLIENT_NOT_CREATED);
      }
      return new ApiResponse(201, client, Msg.CLIENT_CREATED);
    } catch (error) {
      console.log(`Error creating client: ${error.message}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async update(dto: any) {
    try {
      const client = await this.clientModel.findByIdAndUpdate(dto.id, dto, {
        new: true,
      });
      if (!client) {
        return new ApiResponse(404, {}, Msg.CLIENT_NOT_FOUND);
      }
      return new ApiResponse(200, client, Msg.CLIENT_UPDATED);
    } catch (error) {
      console.log(`Error updating client: ${error.message}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
