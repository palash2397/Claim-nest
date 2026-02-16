import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTimeLossDto {

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  checkNumber?: string;

  @IsString()
  payee: string;

  @IsNumber()
  totalCheck: number;

  @IsNumber()
  iwjFee: number;

  @IsNumber()
  paidOut: number;

  @IsEnum(['Deposit', 'Check', 'Wire', 'Other'])
  method: 'Deposit' | 'Check' | 'Wire' | 'Other';

  @IsOptional()
  @IsString()
  bank?: string;

  @IsOptional()
  @IsBoolean()
  cleared?: boolean;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsMongoId()
  caseId?: string;
}
