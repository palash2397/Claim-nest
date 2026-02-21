import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseEmailDto {

  @ApiProperty()
  @IsMongoId()
  caseId: string;

  @ApiProperty()
  @IsEnum(['Incoming', 'Outgoing'])
  direction: 'Incoming' | 'Outgoing';

  @ApiProperty()
  @IsOptional()
  @IsString()
  from?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  to?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cc?: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsDateString()
  emailDate: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  attachmentUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  followUpRequired?: boolean;
}
