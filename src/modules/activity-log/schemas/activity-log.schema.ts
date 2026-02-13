import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ActivityLogDocument = ActivityLog & Document;

@Schema({ timestamps: true })
export class ActivityLog {

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  caseId: Types.ObjectId;

  @Prop({ required: true })
  activity: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
