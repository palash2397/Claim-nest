import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {

  @IsMongoId()
  @ApiProperty()
  id: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  roleUserId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @ApiProperty()
  eventType?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  eventDate?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  @ApiProperty()
  status?: string;
}
