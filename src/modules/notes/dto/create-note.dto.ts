import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';
import { NOTE_TYPES, NOTE_VISIBILITY, VALID_NOTE_TYPES, VALID_NOTE_VISIBILITY } from 'src/common/enums/case-note.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {

  @ApiProperty()
  @IsMongoId()
  caseId: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(VALID_NOTE_TYPES, { message: 'Invalid note type. Valid types are: General, Medical, Legal, Client Contact, Vocational, TL, Strategy, Other, Internal' })
  noteType?: string;

  @ApiProperty()
  @IsOptional()
  @IsIn(VALID_NOTE_VISIBILITY, { message: 'Invalid visibility. Valid options are: Internal, Admin-Only' })
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
