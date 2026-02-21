import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { CommunicationType } from '../../../common/enums/communication-type.enum';
import { Direction } from '../../../common/enums/direction.enum';
import { ContactRole } from '../../../common/enums/contact-role.enum';

export type CallLogDocument = CallLog & Document;




@Schema({ timestamps: true })
export class CallLog {

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  case: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({
    type: String,
    enum: CommunicationType,
    required: true,
  })
  communicationType: string;

  @Prop({
    type: String,
    enum: Direction,
    required: true,
  })
  direction: string;

  @Prop({
    type: String,
    enum: ContactRole,
    default: ContactRole.CLIENT,
  })
  contactRole: string;

  @Prop()
  callDuration: number;

  @Prop()
  contactName: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  notes: string;

  @Prop({ default: false })
  followUpRequired: boolean;

  @Prop()
  followUpDueDate: Date;
}

export const CallLogSchema = SchemaFactory.createForClass(CallLog);