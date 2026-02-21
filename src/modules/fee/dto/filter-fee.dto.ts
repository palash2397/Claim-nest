import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PaymentMethod } from '../../../common/enums/payment-status.enum';
import { FeeStatus } from '../../../common/enums/fee.enum';
import { YesNo } from '../../../common/enums/yes-no.enum';
import { ApiProperty } from '@nestjs/swagger';


export class FilterFeeDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  agreement?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(YesNo)
  timeLoss?: YesNo;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiProperty()
  @IsOptional()
  @IsEnum(FeeStatus)
  status?: FeeStatus;
}