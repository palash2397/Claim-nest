import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PaymentMethod } from '../../../common/enums/payment-status.enum';
import { FeeStatus } from '../../../common/enums/fee.enum';
import { YesNo } from '../../../common/enums/yes-no.enum';

export class FilterFeeDto {

  @IsOptional()
  @IsString()
  agreement?: string;

  @IsOptional()
  @IsEnum(YesNo)
  timeLoss?: YesNo;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsEnum(FeeStatus)
  status?: FeeStatus;
}