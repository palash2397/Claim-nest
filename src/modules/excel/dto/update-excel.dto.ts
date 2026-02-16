import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UploadExcelDto } from './create-excel.dto';

export class UpdateExcelDto extends PartialType(UploadExcelDto) {

  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsEnum(['Pending', 'Processed', 'Failed'])
  status?: 'Pending' | 'Processed' | 'Failed';
}