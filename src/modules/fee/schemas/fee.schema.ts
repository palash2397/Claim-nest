import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { PaymentMethod } from '../../../common/enums/payment-status.enum';
import { FeeStatus } from '../../../common/enums/fee.enum';
import { YesNo } from '../../../common/enums/yes-no.enum';

export type FeeDocument = Fee & Document;


@Schema({ timestamps: true })
export class Fee {

  // @Prop({ type: Types.ObjectId, ref: 'Case' })
  // caseId: Types.ObjectId;

  @Prop({ required: true })
  clientName: string;

  @Prop({ enum: YesNo, default: YesNo.NO })
  timeLoss: YesNo;

  @Prop()
  agreement: string;

  @Prop({ enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Prop()
  bank: string;

  @Prop()
  accountLast4: string;

  @Prop()
  guide: string;

  @Prop()
  notes: string;

  // Calendar tracking
  @Prop({ type: Date })
  nextDueDate: Date;

  @Prop({
    enum: FeeStatus,
    default: FeeStatus.FEE_DUE,
  })
  status: FeeStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const FeeSchema = SchemaFactory.createForClass(Fee);
