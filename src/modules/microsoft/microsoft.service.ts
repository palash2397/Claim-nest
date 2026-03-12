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
}


// nest g s service-name
// nest g s modules/microsoft/outlook.service.ts