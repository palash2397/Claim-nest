import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProtestEnum } from '../../../common/enums/protest-enum';

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
  @IsEnum(ProtestEnum)
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  outcome?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes?: string;
}
