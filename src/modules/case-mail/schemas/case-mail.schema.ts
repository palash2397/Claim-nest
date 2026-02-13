import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CaseEmailDocument = CaseEmail & Document;

@Schema({ timestamps: true })
export class CaseEmail {
  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  @Prop({ enum: ['Incoming', 'Outgoing'], required: true })
  direction: 'Incoming' | 'Outgoing';

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  cc?: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ type: Date, required: true })
  emailDate: Date;

  @Prop()
  summary: string;

  @Prop()
  attachmentUrl?: string;

  /* ===== FOLLOW-UP AUTOMATION ===== */

  @Prop({ default: false })
  followUpRequired: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  linkedTaskId?: Types.ObjectId;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const CaseEmailSchema = SchemaFactory.createForClass(CaseEmail);
