import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  id: string;
  
  @IsOptional()
  @IsString()
  @ApiProperty()
  taskTitle?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  internalNotes?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  callRecipient?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  callReason?: string;

  @IsOptional()
  @IsEnum(['Returned', 'No Callback Needed', 'Will Call Back'])
  @ApiProperty()
  callStatus?: 'Returned' | 'No Callback Needed' | 'Will Call Back';

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  assignedTo?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  @ApiProperty()
  status?: 'Pending' | 'Completed' | 'Cancelled';

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  deadline?: string;
}
