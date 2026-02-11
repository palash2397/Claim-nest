import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDocument, User } from './schemas/user.schema';
import { Msg } from '../../utils/helper/responseMsg';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { ApiResponse } from '../../utils/helper/ApiResponse';

@Injectable()
export class UserService {
  @InjectModel('User') private readonly userModel: Model<UserDocument>;

  async createUser(dto: CreateUserDto) {
    try {
      const { name, email, password, role } = dto;
      const user = await this.userModel.findOne({ email });
      if (user) {
        return new ApiResponse(400, {}, Msg.USER_EXISTS);
      }
      const newUser = new this.userModel({ name, email, password, role });
      await newUser.save();
      return new ApiResponse(201, newUser , Msg.USER_REGISTER);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async login(dto: LoginUserDto) {
    try {
      const { email, password } = dto;
      const user = await this.userModel.findOne({ email }).select('+password');
      if (!user) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new ApiResponse(401, {}, Msg.INVALID_CREDENTIALS);
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
        expiresIn: '10d',
      });

      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
      };
      return new ApiResponse(200, userData, Msg.LOGIN_SUCCESS);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
