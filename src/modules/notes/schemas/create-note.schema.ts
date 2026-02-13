import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NoteDocument = Note & Document;

export const NOTE_TYPES = [
  'General',
  'Medical',
  'Legal',
  'Client Communication',
  'Internal',
] as const;

export const NOTE_VISIBILITY = ['Internal', 'Admin Only'] as const;

@Schema({ timestamps: true })
export class Note {
  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  caseId: Types.ObjectId;

  @Prop({ enum: NOTE_TYPES, default: 'General' })
  noteType: string;

  @Prop({ enum: NOTE_VISIBILITY, default: 'Internal' })
  visibility: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  details: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  linkedTaskId?: Types.ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
