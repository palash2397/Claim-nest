import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCaseEmailDto {

  @IsMongoId()
  caseId: string;

  @IsEnum(['Incoming', 'Outgoing'])
  direction: 'Incoming' | 'Outgoing';

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  cc?: string;

  @IsString()
  subject: string;

  @IsDateString()
  emailDate: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  attachmentUrl?: string;

  @IsOptional()
  @IsBoolean()
  followUpRequired?: boolean;
}
