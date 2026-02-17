import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type CaseContactDocument = CaseContact & Document;

@Schema({ timestamps: true })
export class CaseContact {

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Contact', required: true })
  contactId: Types.ObjectId;

  @Prop({ required: true })
  roleOnCase: string; // Client, Employer, Doctor, Attorney

  @Prop({ default: false })
  isPrimary: boolean;

  @Prop()
  caseSpecificNotes: string;

  @Prop()
  overridePhone: string;

  @Prop()
  overrideEmail: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const CaseContactSchema = SchemaFactory.createForClass(CaseContact);