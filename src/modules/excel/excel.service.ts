import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';
import { Excel, ExcelDocument } from './schemas/excel.schema';

import { ApiResponse } from 'src/utils/helper/ApiResponse';
import { Msg } from '../../utils/helper/responseMsg';

import { UploadExcelDto } from './dto/create-excel.dto';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class ExcelService {
  constructor(
    @InjectModel(Excel.name)
    private excelModel: Model<ExcelDocument>,
    private awsService: AwsService,
  ) {}

  async uploadExcel(
    dto: UploadExcelDto,
    file: Express.Multer.File,
    userId: string,
  ) {
    try {
      const uploadResult = await this.awsService.uploadFile(
        `excel/sheet/${Date.now()}-${file.originalname}`,
        file.buffer,
        file.mimetype,
      );

      if (!uploadResult) {
        return new ApiResponse(500, {}, Msg.AWS_ERROR);
      }

      return new ApiResponse(200, {}, Msg.EXCEL_UPLOADED_SUCCESSFULLY);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
