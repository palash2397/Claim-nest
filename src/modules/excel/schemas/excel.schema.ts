import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { ExcelSheetType, ExcelStatus } from 'src/common/enums/excel.enum';

export type ExcelDocument = Excel & Document;

@Schema({ timestamps: true })
export class Excel {

  @Prop({ required: true })
  sheetName: string;

  @Prop({
    enum: ExcelSheetType,
    required: true,
  })
  sheetType: ExcelSheetType;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ default: ExcelStatus.PENDING })
  status: ExcelStatus;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  uploadedBy: Types.ObjectId;
}

export const ExcelSchema = SchemaFactory.createForClass(Excel);
