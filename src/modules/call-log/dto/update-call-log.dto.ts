import { PartialType } from '@nestjs/mapped-types';
import { CreateCallLogDto } from './create-call-log.dto';

import { IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateCallLogDto extends PartialType(CreateCallLogDto) {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
