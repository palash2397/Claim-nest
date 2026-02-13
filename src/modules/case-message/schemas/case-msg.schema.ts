import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CaseMessageDocument = CaseMessage & Document;

@Schema({ timestamps: true })
export class CaseMessage {

  /* ===== LINK TO CASE ===== */

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  /* ===== MESSAGE META ===== */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  from: Types.ObjectId;

  @Prop()
  regarding: string; 

  @Prop({
    enum: ['Open', 'Resolved', 'Pending'],
    default: 'Open',
  })
  status: 'Open' | 'Resolved' | 'Pending';


  /* ===== CONTENT ===== */
  @Prop()
  message: string;

  @Prop({
    enum: ['Call Back', 'Follow Up', 'None'],
  })
  action: string;

  @Prop()
  note: string;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const CaseMessageSchema =
  SchemaFactory.createForClass(CaseMessage);
