import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ContactDocument = Contact & Document;

export const CONTACT_STATUS = [
  'Potential',
  'Inquiry',
  'Client',
  'Callback',
  'Closed',
] as const;


@Schema({ timestamps: true })
export class Contact {

  @Prop({ required: true })
  displayName: string;

  @Prop()
  companyName: string;

  @Prop()
  primaryPhone: string;

  @Prop()
  secondaryPhone: string;

  @Prop()
  email: string;

  @Prop()
  addressLine1: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zipCode: string;

  @Prop()
  notes: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}


export const ContactSchema = SchemaFactory.createForClass(Contact);
