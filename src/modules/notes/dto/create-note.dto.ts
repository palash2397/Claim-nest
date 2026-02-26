import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
// import { NOTE_TYPES, NOTE_VISIBILITY } from 'src/common/enums/case-note.enum';
// import { IsValidNoteType, IsValidVisibility } from 'src/common/validators/note-validators';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {

  @ApiProperty()
  @IsMongoId()
  caseId: string;

  @ApiProperty()
  @IsOptional()
  noteType?: string;

  @ApiProperty()
  @IsOptional()
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

  @ApiProperty()
  @IsOptional()
  assignTo?: string;

  @ApiProperty()
  @IsOptional()
  taskTitle?: string;

  @ApiProperty()
  @IsOptional()
  taskType?: string;

  @ApiProperty()
  @IsOptional()
  priority?: string;

  @ApiProperty()
  @IsOptional()
  linkToCalendar?: boolean;


}
