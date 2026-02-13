import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProtestAppealDocument = ProtestAppeal & Document;

@Schema({ timestamps: true })
export class ProtestAppeal {

  /* ===== CASE LINK ===== */

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  /* ===== CORE INFO ===== */

  @Prop({ type: Date, required: true })
  doDate: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, required: true })
  deadline: Date;

  @Prop({
    enum: ['Protested', 'Appealed', 'No Action'],
    required: true,
  })
  status: 'Protested' | 'Appealed' | 'No Action';

  @Prop()
  outcome: string;

  @Prop()
  notes: string;

  /* ===== AUTOMATION TRACKING ===== */

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  linkedTaskId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event' })
  linkedEventId?: Types.ObjectId;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const ProtestAppealSchema =
  SchemaFactory.createForClass(ProtestAppeal);
