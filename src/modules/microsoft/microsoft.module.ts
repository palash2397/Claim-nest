import { Module } from '@nestjs/common';
import { MicrosoftService } from './microsoft.service';
import { MicrosoftController } from './microsoft.controller';
import { OutlookService } from './outlook/outlook.service';
import { CalenderService } from './calender/calender.service';
import { OnedriveService } from './onedrive/onedrive.service';
import { GraphService } from './services/graph.service';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [MicrosoftController],
  providers: [
    MicrosoftService,
    OutlookService,
    CalenderService,
    OnedriveService,
    GraphService,
  ],
  exports: [
    MicrosoftService,
    OutlookService,
    CalenderService,
    OnedriveService,
    GraphService,
  ],
})
export class MicrosoftModule {}
