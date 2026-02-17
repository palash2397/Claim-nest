import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {

  // Must always attach to a case
  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  // Call or Text
  @Prop({
    enum: ['Call', 'Text'],
    required: true,
  })
  type: 'Call' | 'Text';

  // Incoming or Outgoing
  @Prop({
    enum: ['Incoming', 'Outgoing'],
    required: true,
  })
  direction: 'Incoming' | 'Outgoing';

  // From (editable string now)
  @Prop({ required: true })
  from: string;

  // Optional To field
  @Prop()
  to: string;

  // Notes about communication
  @Prop({ required: true })
  notes: string;

  // Communication date/time
  @Prop({ type: Date, required: true })
  communicationDate: Date;

  // Which staff logged it
  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);