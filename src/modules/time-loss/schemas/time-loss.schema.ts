import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PaymentLedgerDocument = PaymentLedger & Document;

@Schema({ timestamps: true })
export class PaymentLedger {

  /* ===== BASIC INFO ===== */

  @Prop({ type: Date, required: true, index: true })
  date: Date;

  @Prop()
  checkNumber: string;

  @Prop({ required: true })
  payee: string;

  /* ===== FINANCIAL DETAILS ===== */

  @Prop({ type: Number, required: true })
  totalCheck: number;

  @Prop({ type: Number, required: true })
  iwjFee: number;

  @Prop({ type: Number, required: true })
  paidOut: number;

  /* ===== PAYMENT METHOD ===== */

  @Prop({
    enum: ['Deposit', 'Check', 'Wire', 'Other'],
    required: true,
  })
  method: 'Deposit' | 'Check' | 'Wire' | 'Other';

  @Prop()
  bank: string;

  @Prop()
  accountNumber?: string;

  @Prop({ default: false })
  cleared: boolean;

  /* ===== NOTES ===== */

  @Prop()
  notes: string;

  /* ===== OPTIONAL CASE LINK ===== */

  @Prop({ type: Types.ObjectId, ref: 'Case', required: false })
  caseId?: Types.ObjectId;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const PaymentLedgerSchema =
  SchemaFactory.createForClass(PaymentLedger);
