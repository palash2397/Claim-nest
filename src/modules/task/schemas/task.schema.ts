import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import {
  TaskCallStatus,
  TaskPriority,
  TaskStatus,
  TaskType,
} from '../../../common/enums/task.enum';

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
    enum: TaskCallStatus,
  })
  callStatus: string;

  /* ===== TASK CLASSIFICATION ===== */

  @Prop({
    enum: TaskType,
  })
  taskType: string;

  @Prop({
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: string;

  /* ===== ASSIGNMENT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  assignedTo: Types.ObjectId;

  @Prop({
    enum: TaskStatus,
    default: TaskStatus.PENDING,
    index: true,
  })
  status: string;

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
