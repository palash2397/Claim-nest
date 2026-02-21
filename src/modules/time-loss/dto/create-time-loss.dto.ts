import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeLossDto {

  @IsDateString()
  @ApiProperty()
  date: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  checkNumber?: string;

  @IsString()
  @ApiProperty()
  payee: string;

  @IsNumber()
  @ApiProperty()
  totalCheck: number;

  @IsNumber()
  @ApiProperty()
  iwjFee: number;

  @IsNumber()
  @ApiProperty()
  paidOut: number;

  @IsEnum(['Deposit', 'Check', 'Wire', 'Other'])
  @ApiProperty()
  method: 'Deposit' | 'Check' | 'Wire' | 'Other';

  @IsOptional()
  @IsString()
  @ApiProperty()
  bank?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  accountNumber?: string;

  @IsOptional()
  @IsBoolean()
  cleared?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  notes?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  caseId?: string;
}
