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
import { ApiProperty } from '@nestjs/swagger';

import { CommunicationType } from '../../../common/enums/communication-type.enum';
import { Direction } from '../../../common/enums/direction.enum';
import { ContactRole } from '../../../common/enums/contact-role.enum';

export class CreateCallLogDto {

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  case: string;

  @ApiProperty()
  @IsEnum(CommunicationType)
  communicationType: CommunicationType;

  @ApiProperty()
  @IsEnum(Direction)
  direction: Direction;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ContactRole)
  contactRole?: ContactRole;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  callDuration?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contactName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  followUpRequired?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  followUpDueDate?: string;
}