import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';

export class UpdateCaseDto {
  @IsOptional()
  @IsString()
  caseTitle?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  clientPhone?: string;

  @IsOptional()
  @IsString()
  clientAddress?: string;

  @IsOptional()
  @IsString()
  clientWork?: string;

  @IsOptional()
  @IsDateString()
  clientDob?: string;

  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @IsOptional()
  @IsString()
  claimNo?: string;

  @IsOptional()
  @IsDateString()
  doi?: string;

  @IsOptional()
  @IsString()
  employer?: string;

  @IsOptional()
  @IsString()
  vrc?: string;

  @IsOptional()
  @IsString()
  vrcPhone?: string;

  @IsOptional()
  @IsEnum(['Yes', 'No'])
  tl?: 'Yes' | 'No';

  @IsOptional()
  @IsEnum(['Active', 'Intake', 'Closed'])
  status?: 'Active' | 'Intake' | 'Closed';

  @IsOptional()
  @IsDateString()
  lastApf?: string;

  @IsOptional()
  @IsDateString()
  lastWsf?: string;
}
