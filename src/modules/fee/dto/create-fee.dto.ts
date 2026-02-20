import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  Length,
} from 'class-validator';

import { PaymentMethod } from '../../../common/enums/payment-status.enum';
import { FeeStatus } from '../../../common/enums/fee.enum';
import { YesNo } from '../../../common/enums/yes-no.enum';

export class CreateFeeDto {

  // @IsOptional()
  // @IsString()
  // caseId?: string;

  @IsString()
  clientName: string;

  @IsOptional()
  @IsEnum(YesNo)
  timeLoss?: YesNo;

  @IsOptional()
  @IsString()
  agreement?: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsString()
  bank?: string;

  @IsOptional()
  @Length(4, 4)
  accountLast4?: string;

  @IsOptional()
  @IsString()
  guide?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  nextDueDate?: string;

  @IsOptional()
  @IsEnum(FeeStatus)
  status?: FeeStatus;
}