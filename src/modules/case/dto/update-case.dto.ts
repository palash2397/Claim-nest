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
  cmPhone?: string;

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
  cm?: string;

  @IsOptional()
  @IsString()
  supervisor?: string;

  @IsOptional()
  @IsString()
  supervisorPhone?: string;

  @IsOptional()
  @IsString()
  tpa?: string;

  @IsOptional()
  @IsString()
  tpaPhone?: string;

  @IsOptional()
  @IsString()
  si?: string;

  @IsOptional()
  @IsString()
  siPhone?: string;

  @IsOptional()
  @IsString()
  provider?: string;

  @IsOptional()
  @IsString()
  providerPhone?: string;

  @IsOptional()
  @IsString()
  vrc?: string;

  @IsOptional()
  @IsString()
  vrcPhone?: string;


  @IsOptional()
  @IsString()
  vocationalStatus?: string;

  @IsOptional()
  @IsString()
  roa?: string;

  @IsOptional()
  @IsString()
  allowedConditions?: string;

  @IsOptional()
  @IsString()
  assignedManager?: string;

  @IsOptional()
  @IsString()
  lastActivity?: string;


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
