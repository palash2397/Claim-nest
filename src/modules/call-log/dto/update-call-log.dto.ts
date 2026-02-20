import { PartialType } from '@nestjs/mapped-types';
import { CreateCallLogDto } from './create-call-log.dto';

import { IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCallLogDto extends PartialType(CreateCallLogDto) {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
