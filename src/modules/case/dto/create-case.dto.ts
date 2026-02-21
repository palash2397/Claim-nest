import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseDto {
  /* ===== REQUIRED (IDENTITY) ===== */

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  caseTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  clientName: string;

  /* ===== OPTIONAL OVERVIEW FIELDS ===== */

  @ApiProperty()
  @IsOptional()
  @IsString()
  clientPhone?: string;

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
  vrc?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vrcPhone?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(['Yes', 'No'])
  tl?: 'Yes' | 'No';

  @ApiProperty()
  @IsOptional()
  @IsEnum(['Active', 'Intake', 'Closed'])
  status?: 'Active' | 'Intake' | 'Closed';
}
