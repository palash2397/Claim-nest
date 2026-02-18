import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CaseContactDocument = CaseContact & Document;

@Schema({ timestamps: true })
export class CaseContact {

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Contact', required: true })
  contactId: Types.ObjectId;

  @Prop({ required: true })
  roleOnCase: string;

  @Prop({ default: false })
  isPrimary: boolean;

  @Prop()
  caseNotes: string;
}

export const CaseContactSchema =
  SchemaFactory.createForClass(CaseContact);
