import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class AddTimeLossDto {
  @IsDateString()
  fromDate: string; // frontend sends ISO, UI shows mm/dd/yy

  @IsDateString()
  toDate: string;

  @IsEnum(['Weekly', 'Bi-Weekly', 'Monthly'])
  payPeriod: string;

  @IsOptional()
  @IsString()
  description?: string;
}
