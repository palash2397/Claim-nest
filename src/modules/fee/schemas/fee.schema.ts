import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { PaymentMethod } from '../../../common/enums/payment-status.enum';
import { FeeStatus } from '../../../common/enums/fee.enum';

export type FeeDocument = Fee & Document;


@Schema({ timestamps: true })
export class Fee {

  @Prop({ required: true })
  clientName: string;

  @Prop({ enum: ['Yes', 'No'], default: 'No' })
  timeLoss: 'Yes' | 'No';

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
