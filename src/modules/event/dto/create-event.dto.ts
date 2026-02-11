import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsMongoId()
  caseId: string;

  @IsMongoId()
  roleUserId: string;

  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  eventType: string;

  @IsDateString()
  eventDate: string;

  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status: string;
}
