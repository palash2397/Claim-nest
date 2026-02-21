import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NOTE_TYPES, NOTE_VISIBILITY } from '../schemas/create-note.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {

  @ApiProperty()
  @IsMongoId()
  caseId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NOTE_TYPES)
  noteType?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(NOTE_VISIBILITY)
  visibility?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  details: string;

  @ApiProperty()
  @IsOptional()
  createTask?: boolean; // for later automation
}
