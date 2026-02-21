import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument, Types } from 'mongoose';
import { DOCUMENT_CATEGORIES } from 'src/common/enums/document.enum';

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
    enum: DOCUMENT_CATEGORIES, 
    required: true,
  })
  category: DOCUMENT_CATEGORIES;

  @Prop()
  description?: string;

  /* ===== AUDIT ===== */

  @Prop({ type: Types.ObjectId, ref: 'User' })
  uploadedBy: Types.ObjectId;
}

export const DocumentFileSchema = SchemaFactory.createForClass(DocumentFile);
