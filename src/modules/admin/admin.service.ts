import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '../../utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { User, UserDocument } from '../user/schemas/user.schema';
import { UserRole } from 'src/common/enums/user-role.enum';
import { AssignRoleDto } from './dto/assign-role.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers() {
   try {
     const users = await this.userModel.find({role: {$ne: 'Admin'}});
     if (!users || users.length === 0) {
      return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
     }
     return new ApiResponse(200, users, Msg.USERS_FETCHED);
   } catch (error) {
     console.log(`error while getting all users: ${error}`);
     return new ApiResponse(500, {}, Msg.SERVER_ERROR);
   }
  }

  async assignRole(dto: AssignRoleDto) {
    try {
      const userDoc = await this.userModel.findById(dto.id);
      if (!userDoc) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }
      userDoc.role = dto.role;
      await userDoc.save();
      
      return new ApiResponse(200, userDoc, `${dto.role} role assigned successfully`);
    } catch (error) {
      console.log(`error while assigning role: ${error}`);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
