import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';

import { Msg } from 'src/utils/helper/responseMsg';
import { ApiResponse } from 'src/utils/helper/ApiResponse';

@Injectable()
export class GraphService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  private graphBaseUrl = 'https://graph.microsoft.com/v1.0';

  private async refreshAccessToken(user: UserDocument): Promise<string> {
    if (!user.microsoftRefreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    try {
      const response = await axios.post(
        `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
        new URLSearchParams({
          client_id: process.env.MICROSOFT_CLIENT_ID!,
          client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
          refresh_token: user.microsoftRefreshToken,
          grant_type: 'refresh_token',
          scope: 'https://graph.microsoft.com/.default offline_access',
        }),
      );

      const data = response.data;

      user.microsoftAccessToken = data.access_token;
      user.microsoftRefreshToken =
        data.refresh_token || user.microsoftRefreshToken;
      user.microsoftTokenExpiry = new Date(Date.now() + data.expires_in * 1000);

      await user.save();

      return data.access_token;
    } catch (error) {
      console.log(`error while getting refresh access token`, error);
      //   new ApiResponse(500, {}, Msg.SERVER_ERROR);
      throw new UnauthorizedException('Unable to refresh Microsoft token');
    }
  }

  async getAccessToken(userId: string): Promise<string | ApiResponse> {
    const user = await this.userModel.findById(userId);

    if (!user?.microsoftAccessToken) {
      return new ApiResponse(401, {}, Msg.MICROSOFT_ACCOUNT_NOT_CONNECTED);
    }

    const now = Date.now();

    if (
      user.microsoftTokenExpiry &&
      user.microsoftTokenExpiry.getTime() > now + 60000
    ) {
      return user.microsoftAccessToken;
    }

    return this.refreshAccessToken(user);
  }

  async graphRequest(
    userId: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any,
  ) {
    const accessToken = await this.getAccessToken(userId);

    try {
      const response = await axios({
        method,
        url: `${this.graphBaseUrl}${endpoint}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data,
      });

      return response.data;
    } catch (error) {
      //   throw new UnauthorizedException('Microsoft Graph API request failed');

      console.log(`error while getting graph request`, error);

      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
