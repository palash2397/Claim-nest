import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProtestAppealDto {

  @IsMongoId()
  caseId: string;

  @IsDateString()
  doDate: string;

  @IsString()
  description: string;

  @IsDateString()
  deadline: string;

  @IsEnum(['Protested', 'Appealed', 'No Action'])
  status: 'Protested' | 'Appealed' | 'No Action';

  @IsOptional()
  @IsString()
  outcome?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
