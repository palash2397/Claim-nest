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

      const record = await this.excelModel.create({
        sheetName: dto.sheetName,
        sheetType: dto.sheetType,
        fileName: file.originalname,
        fileUrl: uploadResult.Location,
        status: 'Pending',
        uploadedBy: new Types.ObjectId(userId),
      });

      return new ApiResponse(200, record, Msg.EXCEL_UPLOADED_SUCCESSFULLY);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }

  //   async updateExcel(id: string, dto: UploadExcelDto) {
  //     try {
  //       const sheet = await this.excelModel.findByIdAndUpdate(id, dto, {
  //         new: true,
  //       });
  //       return new ApiResponse(200, sheet, Msg.EXCEL_UPDATED_SUCCESSFULLY);
  //     } catch (error) {
  //       return new ApiResponse(500, {}, Msg.SERVER_ERROR);
  //     }
  //   }

  async findOne(id: string) {
    try {
      const sheet = await this.excelModel.findById(id);
      if (!sheet) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }

      sheet.fileUrl = await this.awsService.getSignedFileUrl(sheet.fileUrl);


      return new ApiResponse(200, sheet, Msg.EXCEL_FETCHED_SUCCESSFULLY);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }


  async findAll(){
    try {
      const sheets = await this.excelModel.find();
      if (!sheets || sheets.length === 0) {
        return new ApiResponse(404, {}, Msg.DATA_NOT_FOUND);
      }

      for (const sheet of sheets) {
        sheet.fileUrl = await this.awsService.getSignedFileUrl(sheet.fileUrl);
      }
      return new ApiResponse(200, sheets, Msg.SUCCESS);
    } catch (error) {
      return new ApiResponse(500, {}, Msg.SERVER_ERROR);
    }
  }
}
