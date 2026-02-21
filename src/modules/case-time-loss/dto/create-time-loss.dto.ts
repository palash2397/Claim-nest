import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeLossDto {

  @ApiProperty()
  @IsMongoId()
  caseId: string;

  @ApiProperty()
  @IsDateString()
  payPeriodStart: string;

  @ApiProperty()
  @IsDateString()
  payPeriodEnd: string;

  @ApiProperty()
  @IsNumber()
  grossAmount: number;

  @ApiProperty()
  @IsNumber()
  legalFee: number;

  @ApiProperty()
  @IsNumber()
  totalToClient: number;

  @ApiProperty()
  @IsOptional()
  checkNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  receivedDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  disbursedDate?: string;

  @ApiProperty()
  @IsOptional()
  notes?: string;
}
