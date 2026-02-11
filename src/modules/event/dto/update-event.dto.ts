import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEventDto {

  @IsMongoId()
  id: string;

  @IsOptional()
  @IsMongoId()
  roleUserId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  eventType?: string;

  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status?: string;
}
