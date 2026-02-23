import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ConversationType } from '../../../../common/enums/conversation-type.enum';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation {

  @Prop({ enum: ConversationType, required: true })
  type: ConversationType;

  @Prop()
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Case', default: null })
  caseId?: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  participants: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ default: 0 })
  unreadCount: number;
}

export const ConversationSchema =
  SchemaFactory.createForClass(Conversation);