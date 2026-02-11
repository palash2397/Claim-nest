import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  
  @IsOptional()
  @IsString()
  taskTitle?: string;

  @IsOptional()
  @IsString()
  internalNotes?: string;

  @IsOptional()
  @IsString()
  callRecipient?: string;

  @IsOptional()
  @IsString()
  callReason?: string;

  @IsOptional()
  @IsEnum(['Returned', 'No Callback Needed', 'Will Call Back'])
  callStatus?: 'Returned' | 'No Callback Needed' | 'Will Call Back';

  @IsOptional()
  @IsMongoId()
  assignedTo?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status?: 'Pending' | 'Completed' | 'Cancelled';

  @IsOptional()
  @IsDateString()
  deadline?: string;
}
