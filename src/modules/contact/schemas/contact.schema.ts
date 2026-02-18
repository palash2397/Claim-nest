import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ContactDocument = Contact & Document;

export enum ContactType {
  CLIENT = 'Client',
  ATTORNEY = 'Attorney',
  EMPLOYER = 'Employer',
  MEDICAL = 'Medical',
  OTHER = 'Other',
}

export enum ContactStatus {
  POTENTIAL = 'Potential',
  INQUIRY = 'Inquiry',
  CLIENT = 'Client',
  CALLBACK = 'Callback',
  CLOSED = 'Closed',
}

@Schema({ timestamps: true })
export class Contact {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  company: string;

  @Prop()
  primaryPhone: string;

  @Prop()
  secondaryPhone: string;

  @Prop()
  email: string;

  @Prop()
  addressLine1: string;

  @Prop()
  addressLine2: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop({
    enum: ContactType,
    default: ContactType.OTHER,
  })
  contactType: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    enum: ContactStatus,
    default: ContactStatus.POTENTIAL,
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
