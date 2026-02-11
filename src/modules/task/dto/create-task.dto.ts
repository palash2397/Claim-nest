import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateTaskDto {
  /* ===== CASE CONTEXT ===== */
  @IsMongoId()
  caseId: string

  /* ===== TASK DETAILS ===== */

  @IsNotEmpty()
  @IsString()
  taskTitle: string;

  @IsOptional()
  @IsString()
  internalNotes?: string;

  /* ===== CALL LOG & MESSAGING ===== */

  @IsOptional()
  @IsString()
  callRecipient?: string;

  @IsOptional()
  @IsString()
  callReason?: string;

  @IsOptional()
  @IsEnum(['Returned', 'No Callback Needed', 'Will Call Back'])
  callStatus?: 'Returned' | 'No Callback Needed' | 'Will Call Back';

  /* ===== ASSIGNMENT ===== */

  @IsMongoId()
  assignedTo: string;

  @IsOptional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status?: 'Pending' | 'Completed' | 'Cancelled';

  @IsOptional()
  @IsDateString()
  deadline?: string;
}
