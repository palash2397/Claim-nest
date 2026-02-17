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
  /* ===== BASIC INFO ===== */

  @Prop({ required: true })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  /* ===== STATUS ===== */

  @Prop({
    enum: CONTACT_STATUS,
    default: 'Potential',
  })
  status: string;

  /* ===== ASSIGNMENT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignedTo: Types.ObjectId;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
