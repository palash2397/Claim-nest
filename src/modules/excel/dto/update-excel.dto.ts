import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { UploadExcelDto } from './create-excel.dto';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateExcelDto extends PartialType(UploadExcelDto) {

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(['Pending', 'Processed', 'Failed'])
  status?: 'Pending' | 'Processed' | 'Failed';
}