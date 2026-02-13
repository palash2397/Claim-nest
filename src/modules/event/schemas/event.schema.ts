import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  /* ===== RELATION ===== */

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  caseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  roleUserId: Types.ObjectId; // selected role / staff

  /* ===== EVENT DETAILS ===== */

  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
  })
  eventType: string;

  @Prop({ required: true })
  eventDate: Date;

  @Prop({
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  })
  status: string;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
