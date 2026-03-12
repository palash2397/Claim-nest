import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class MicrosoftService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async microsoftStatus(userId: string) {
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
  }
}

// nest g s service-name
// nest g s modules/microsoft/outlook.service.ts
