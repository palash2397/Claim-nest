import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCaseMessageDto {

  @IsMongoId()
  caseId: string;

  @IsOptional()
  @IsString()
  regarding?: string;

  @IsOptional()
  @IsEnum(['Open', 'Resolved', 'Pending'])
  status?: 'Open' | 'Resolved' | 'Pending';

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsEnum(['Call Back', 'Follow Up', 'None'])
  action?: string;

  @IsOptional()
  @IsString()
  note?: string;
}
