import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class AddProtestAppealDto {
  @IsDateString()
  doDate: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  deadline: string;

  @IsEnum(['Protested', 'Appealed', 'No Action'])
  status: string;

  @IsOptional()
  @IsString()
  outcome?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
