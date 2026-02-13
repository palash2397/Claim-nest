import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument, Types } from 'mongoose';

export type DocumentFileDocument = DocumentFile & MongooseDocument;

@Schema({ timestamps: true })
export class DocumentFile {
  /* ===== LINK TO CASE ===== */

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true, index: true })
  caseId: Types.ObjectId;

  /* ===== FILE INFO ===== */

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  fileUrl: string; // S3 URL

  @Prop({
    enum: [
      'IWJ Documents',
      'Dept Letters',
      'Draft Copies',
      'Medical',
      'Vocational',
      'WSF',
      'SI CFU',
    ],
    required: true,
  })
  category: string;

  @Prop()
  description?: string;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  uploadedBy: Types.ObjectId;
}

export const DocumentFileSchema = SchemaFactory.createForClass(DocumentFile);
