import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMessageDto {

  @IsMongoId()
  caseId: string;

  @IsEnum(['Call', 'Text'])
  type: 'Call' | 'Text';

  @IsEnum(['Incoming', 'Outgoing'])
  direction: 'Incoming' | 'Outgoing';

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsDateString()
  communicationDate: string;
}
