import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PaymentMethod } from '../../../common/enums/payment-status.enum';
import { FeeStatus } from '../../../common/enums/fee.enum';
import { YesNo } from '../../../common/enums/yes-no.enum';

export class CreateFeeDto {

  // @IsOptional()
  // @IsString()
  // caseId?: string;

  @ApiProperty()
  @IsString()
  clientName: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(YesNo)
  timeLoss?: YesNo;

  @ApiProperty()
  @IsOptional()
  @IsString()
  agreement?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bank?: string;

  @ApiProperty()
  @IsOptional()
  @Length(4, 4)
  accountLast4?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  guide?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  nextDueDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(FeeStatus)
  status?: FeeStatus;
}