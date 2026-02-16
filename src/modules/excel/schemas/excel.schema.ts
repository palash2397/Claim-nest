import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExcelDocument = Excel & Document;

@Schema({ timestamps: true })
export class Excel {

  @Prop({ required: true })
  sheetName: string;

  @Prop({
    enum: ['Contacts', 'Tasks', 'PNCs', 'Cases'],
    required: true,
  })
  sheetType: 'Contacts' | 'Tasks' | 'PNCs' | 'Cases';

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ default: 'Pending' })
  status: 'Pending' | 'Processed' | 'Failed';

  @Prop({ type: Types.ObjectId, ref: 'User' })
  uploadedBy: Types.ObjectId;
}

export const ExcelSchema = SchemaFactory.createForClass(Excel);
