import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Response } from 'express';

import axios from 'axios';
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

  getMicrosoftAuthUrl(res: Response) {
    const params = new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID!,
      response_type: 'code',
      redirect_uri: process.env.MICROSOFT_CALLBACK_URL!,
      response_mode: 'query',
      // scope: 'openid profile email User.Read offline_access',
      scope: 'Calendars.ReadWrite email Files.ReadWrite Mail.Read Mail.ReadWrite Mail.Send openid profile User.Read offline_access',
    });

    const url = `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize?${params}`;

    return res.redirect(url);
  }

  async handleMicrosoftCallback(code: string, res: Response) {
    try {
      if (!code) {
        return new ApiResponse(400, {}, Msg.MICROSOFT_NO_CODE_PROVIDED);
      }

      const tokenRes = await axios.post(
        `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
        new URLSearchParams({
          client_id: process.env.MICROSOFT_CLIENT_ID!,
          client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
          code,
          redirect_uri: process.env.MICROSOFT_CALLBACK_URL!,
          grant_type: 'authorization_code',
          scope: 'Calendars.ReadWrite email Files.ReadWrite Mail.Read Mail.ReadWrite Mail.Send openid profile User.Read offline_access',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      console.log('token res -------->', tokenRes);
      console.log('token data -------->', tokenRes.data);

      const { access_token, refresh_token, expires_in } = tokenRes.data;

      const userRes = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const profile = userRes.data;
      const email = profile.mail || profile.userPrincipalName;

      let user = await this.userModel.findOne({ email });

      if (!user) {
        user = await this.userModel.create({
          name: profile.displayName,
          email,
          provider: 'microsoft',
          microsoftAccessToken: access_token,
          microsoftRefreshToken: refresh_token,
          microsoftTokenExpiry: new Date(Date.now() + expires_in * 1000),
        });
      } else {
     
        user.microsoftAccessToken = access_token;
        user.microsoftRefreshToken = refresh_token;
        user.microsoftTokenExpiry = new Date(Date.now() + expires_in * 1000);
        user.provider = 'microsoft';

        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' },
      );

      // return new ApiResponse(
      //   200,
      //   { accessToken: token },
      //   Msg.MICROSOFT_LOGIN_SUCCESS,
      // );

      // OR redirect frontend:
      return res.redirect(
        access_token
      );
    } catch (error) {
      console.error('FULL MICROSOFT ERROR:', {
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });

      return res.status(500).json({
        message: 'Microsoft login failed',
        error: error.response?.data || error.message,
      });
    }
  }
}
