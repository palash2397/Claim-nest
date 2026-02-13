import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {

  /* ===== CASE CONTEXT ===== */

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  /* ===== BASIC TASK DETAILS ===== */

  @Prop({ required: true })
  taskTitle: string;

  @Prop()
  internalNotes: string;

  /* ===== CALL LOG & MESSAGING (FROM UI) ===== */

  @Prop()
  callRecipient: string;

  @Prop()
  callReason: string;

  @Prop({
    enum: ['Returned', 'No Callback Needed', 'Will Call Back'],
  })
  callStatus: 'Returned' | 'No Callback Needed' | 'Will Call Back';

  /* ===== TASK CLASSIFICATION ===== */

  @Prop({
    enum: [
      'Follow-Up Call',
      'Document Review',
      'Order Review',
      'Medical Records',
      'APF/WSF',
      'Payment Follow-Up',
      'Vocational Review',
      'Other',
    ],
  })
  taskType: string;

  @Prop({
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium',
  })
  priority: string;

  /* ===== ASSIGNMENT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  assignedTo: Types.ObjectId;

  @Prop({
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
    index: true,
  })
  status: 'Pending' | 'Completed' | 'Cancelled';

  @Prop({ type: Date })
  deadline: Date;

  /* ===== CALENDAR LINKING ===== */

  @Prop({ default: false })
  linkToCalendar: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Event' })
  linkedEventId?: Types.ObjectId;

  /* ===== SOURCE TRACKING (AUTOMATION SAFE) ===== */

  @Prop()
  sourceModule?: string; // 'Manual' | 'Note' | 'ProtestAppeal' | etc.

  @Prop({ type: Types.ObjectId })
  sourceId?: Types.ObjectId;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
