import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { DOCUMENT_CATEGORIES } from 'src/common/enums/document.enum';

import {  ApiProperty } from '@nestjs/swagger';

export class AddDocumentDto {

  @ApiProperty()
  @IsMongoId()
  caseId: string;
 
  @ApiProperty()
  @IsEnum(DOCUMENT_CATEGORIES)
  category: DOCUMENT_CATEGORIES;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;
}
