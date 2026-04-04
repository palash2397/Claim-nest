import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
