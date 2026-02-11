import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseCounterDocument = CaseCounter & Document;

@Schema()
export class CaseCounter {
  @Prop({ required: true, unique: true })
  name: string; // e.g. "case"

  @Prop({ required: true })
  seq: number;
}

export const CaseCounterSchema = SchemaFactory.createForClass(CaseCounter);
