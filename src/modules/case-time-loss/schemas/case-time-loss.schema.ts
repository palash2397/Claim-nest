import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TimeLossDocument = TimeLoss & Document;

@Schema({ timestamps: true })
export class TimeLoss {

  /* ===== LINK TO CASE ===== */

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  /* ===== PAY PERIOD ===== */

  @Prop({ type: Date, required: true })
  payPeriodStart: Date;

  @Prop({ type: Date, required: true })
  payPeriodEnd: Date;

  /* ===== FINANCIALS ===== */

  @Prop({ type: Number, required: true })
  grossAmount: number;

  @Prop({ type: Number, required: true })
  legalFee: number;

  @Prop({ type: Number, required: true })
  totalToClient: number;

  /* ===== PAYMENT DETAILS ===== */

  @Prop()
  checkNumber: string;

  @Prop({ type: Date })
  receivedDate: Date;

  @Prop({ type: Date })
  disbursedDate: Date;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const TimeLossSchema = SchemaFactory.createForClass(TimeLoss);
