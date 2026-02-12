import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {

  // Who sent the message
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  from: Types.ObjectId;

  // Which case this message belongs to
  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  regarding: Types.ObjectId;

  // Message content
  @Prop({ required: true, trim: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);