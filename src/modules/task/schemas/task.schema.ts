import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TaskDocument = Task & Document;


@Schema({ timestamps: true })
export class Task {
  /* ===== CASE CONTEXT ===== */

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  caseId: Types.ObjectId;

  /* ===== TASK DETAILS ===== */

  @Prop({ required: true })
  taskTitle: string;

  @Prop()
  internalNotes: string;

  /* ===== CALL LOG & MESSAGING ===== */

  @Prop()
  callRecipient: string;

  @Prop()
  callReason: string;

  @Prop({
    enum: ['Returned', 'No Callback Needed', 'Will Call Back'],
  })
  callStatus: 'Returned' | 'No Callback Needed' | 'Will Call Back';

  /* ===== ASSIGNMENT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignedTo: Types.ObjectId;

  @Prop({
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  })
  status: 'Pending' | 'Completed' | 'Cancelled';

  @Prop()
  deadline: Date;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}


export const TaskSchema = SchemaFactory.createForClass(Task);
