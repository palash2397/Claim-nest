import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NoteDocument = Note & Document;

import { NOTE_TYPES, NOTE_VISIBILITY } from 'src/common/enums/case-note.enum';

@Schema({ timestamps: true })
export class Note {
  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  caseId: Types.ObjectId;

  @Prop({ enum: NOTE_TYPES, default: NOTE_TYPES.General })
  noteType: string;

  @Prop({ enum: NOTE_VISIBILITY, default: NOTE_VISIBILITY.Internal })
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
