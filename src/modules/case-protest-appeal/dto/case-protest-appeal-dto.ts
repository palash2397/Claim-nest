import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProtestAppealDto {
  
  @ApiProperty()
  @IsMongoId()
  caseId: string;

  @ApiProperty()
  @IsDateString()
  doDate: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  deadline: string;

  @ApiProperty()
  @IsEnum(['Protested', 'Appealed', 'No Action'])
  status: 'Protested' | 'Appealed' | 'No Action';

  @ApiProperty()
  @IsOptional()
  @IsString()
  outcome?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;
}
