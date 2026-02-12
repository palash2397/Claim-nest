import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CallLogDocument = CallLog & Document;


export enum CommunicationType {
  CALL = 'Call',
  TEXT = 'Text',
}

export enum Direction {
  INCOMING = 'Incoming',
  OUTGOING = 'Outgoing',
}

export enum ContactRole {
  CLIENT = 'Client',
  ATTORNEY = 'Attorney',
  EMPLOYER = 'Employer',
  OTHER = 'Other',
}

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