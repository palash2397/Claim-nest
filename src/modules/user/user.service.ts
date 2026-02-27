import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDocument, User } from './schemas/user.schema';
import { Msg } from '../../utils/helper/responseMsg';
import { ApiResponse } from '../../utils/helper/ApiResponse';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
      return new ApiResponse(201, newUser, Msg.USER_REGISTER);
    } catch (error) {
      console.log(`register error ---->`, error);
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

      if (!user.isActive) {
        return new ApiResponse(401, {}, Msg.USER_INACTIVE);
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: '10d',
        },
      );

      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      };
      return new ApiResponse(200, userData, Msg.LOGIN_SUCCESS);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async all(userId: string) {
    try {
      const users = await this.userModel
        .find({ role: 'User', _id: { $ne: userId } })
        .lean();

      if (!users || users.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }
      return new ApiResponse(200, users, Msg.DATA_FETCHED);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async getById(id: string) {
    try {
      const user = await this.userModel.findById(id).lean();
      if (!user) {
        return new ApiResponse(404, {}, Msg.USER_NOT_FOUND);
      }
      return new ApiResponse(200, user, Msg.USER_FETCHED);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  async handleMicrosoftLogin(microsoftUser: any, res: any) {
    const { microsoftId, email, name, accessToken, refreshToken } =
      microsoftUser;

    let user = await this.userModel.findOne({ email });

    if (!user) {
      user = await this.userModel.create({
        name,
        email,
        provider: 'microsoft',
        microsoftId,
        microsoftAccessToken: accessToken,
        microsoftRefreshToken: refreshToken,
      });
    } else {
      user.microsoftAccessToken = accessToken;
      user.microsoftRefreshToken = refreshToken;
      user.microsoftId = microsoftId;
      user.provider = 'microsoft';
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    // Option 1: return JSON
    return { accessToken: token };

    // Option 2: redirect frontend with token
    // return res.redirect(
    //   `http://localhost:5173/login-success?token=${token}`,
    // );
  }
}
