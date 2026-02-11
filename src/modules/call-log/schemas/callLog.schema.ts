import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CallLogDocument = CallLog & Document;

@Schema({ timestamps: true })
export class CallLog {
  @Prop()
  dateTime: string;

  @Prop({ enum: ['Call', 'Text'], required: true })
  commType: 'Call' | 'Text';

  @Prop({ enum: ['Incoming', 'Outgoing'], required: true })
  direction: 'Incoming' | 'Outgoing';

  @Prop()
  contactRole: string;

  @Prop()
  contactName: string;

  @Prop()
  phone: string;

  @Prop()
  caseId: string;

  @Prop()
  clientName: string;

  @Prop()
  durationMinutes: number;

  @Prop()
  textPreview: string;

  @Prop()
  notes: string;

  @Prop({ default: false })
  followUpRequired: boolean;

  @Prop()
  followUpDueDate: string;
}

export const CallLogSchema = SchemaFactory.createForClass(CallLog);
