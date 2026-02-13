import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NOTE_TYPES, NOTE_VISIBILITY } from '../schemas/create-note.schema';

export class CreateNoteDto {

  @IsMongoId()
  caseId: string;

  @IsOptional()
  @IsEnum(NOTE_TYPES)
  noteType?: string;

  @IsOptional()
  @IsEnum(NOTE_VISIBILITY)
  visibility?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsOptional()
  createTask?: boolean; // for later automation
}
