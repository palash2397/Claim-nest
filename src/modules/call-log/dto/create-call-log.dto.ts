import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';


import { CommunicationType, Direction, ContactRole } from '../schemas/callLog.schema';

export class CreateCallLogDto {

  @IsMongoId()
  @IsNotEmpty()
  case: string;

  @IsEnum(CommunicationType)
  communicationType: CommunicationType;

  @IsEnum(Direction)
  direction: Direction;

  @IsOptional()
  @IsEnum(ContactRole)
  contactRole?: ContactRole;

  @IsOptional()
  @IsNumber()
  callDuration?: number;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsOptional()
  @IsBoolean()
  followUpRequired?: boolean;

  @IsOptional()
  @IsDateString()
  followUpDueDate?: string;
}