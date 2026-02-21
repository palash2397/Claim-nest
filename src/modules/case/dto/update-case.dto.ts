import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCaseDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  caseTitle?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cmPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientAddress?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientWork?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  clientDob?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  claimNo?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  doi?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  employer?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cm?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  supervisor?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  supervisorPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tpa?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tpaPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  si?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  siPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  providerPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vrc?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vrcPhone?: string;


  @ApiProperty()
  @IsOptional()
  @IsString()
  vocationalStatus?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  roa?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  allowedConditions?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  assignedManager?: string;



  @ApiProperty()
  @IsOptional()
  @IsEnum(['Yes', 'No'])
  tl?: 'Yes' | 'No';

  @ApiProperty()
  @IsOptional()
  @IsEnum(['Active', 'Intake', 'Closed'])
  status?: 'Active' | 'Intake' | 'Closed';

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  lastApf?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  lastWsf?: string;
}
