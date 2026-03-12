import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/utils/helper/ApiResponse';
import { Msg } from 'src/utils/helper/responseMsg';

import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class MicrosoftService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async microsoftStatus(userId: string) {
    try {
      const user = await this.userModel
        .findById(userId)
        .select('email microsoftAccessToken microsoftRefreshToken');

      if (!user) {
        return {
          connected: false,
        };
      }

      const connected =
        !!user.microsoftAccessToken && !!user.microsoftRefreshToken;

      return {
        connected,
        email: connected ? user.email : null,
      };
    } catch (error) {
      console.log(`error while checking microsoft status`, error);
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}

// nest g s service-name
// nest g s modules/microsoft/outlook.service.ts
