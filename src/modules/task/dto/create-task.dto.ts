import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  /* ===== CASE CONTEXT ===== */
  @IsMongoId()
  @ApiProperty()
  caseId: string

  /* ===== TASK DETAILS ===== */

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  taskTitle: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  internalNotes?: string;

  /* ===== CALL LOG & MESSAGING ===== */

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

  /* ===== ASSIGNMENT ===== */

  @IsMongoId()
  @ApiProperty()
  assignedTo: string;

  @IsOptional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  @ApiProperty()
  status?: 'Pending' | 'Completed' | 'Cancelled';

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  deadline?: string;
}
