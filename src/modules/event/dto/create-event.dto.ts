import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsMongoId()
  @ApiProperty()
  caseId: string;

  @IsMongoId()
  @ApiProperty()
  roleUserId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  eventType: string;

  @IsDateString()
  @ApiProperty()
  eventDate: string;

  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  @ApiProperty()
  status: string;
}
