import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MicrosoftService {}


// nest g s service-name
// nest g s modules/microsoft/outlook.service.ts