import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateTimeLossDto {

  @IsMongoId()
  caseId: string;

  @IsDateString()
  payPeriodStart: string;

  @IsDateString()
  payPeriodEnd: string;

  @IsNumber()
  grossAmount: number;

  @IsNumber()
  legalFee: number;

  @IsNumber()
  totalToClient: number;

  @IsOptional()
  checkNumber?: string;

  @IsOptional()
  @IsDateString()
  receivedDate?: string;

  @IsOptional()
  @IsDateString()
  disbursedDate?: string;

  @IsOptional()
  notes?: string;
}
