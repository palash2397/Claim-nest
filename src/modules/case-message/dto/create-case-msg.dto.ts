import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';  

export class CreateCaseMessageDto {

  @IsMongoId()
  @ApiProperty()
  caseId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  regarding?: string;
  

  @IsOptional()
  @IsEnum(['Open', 'Resolved', 'Pending'])
  @ApiProperty()
  status?: 'Open' | 'Resolved' | 'Pending';


  @ApiProperty()
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(['Call Back', 'Follow Up', 'None'])
  action?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note?: string;
}
