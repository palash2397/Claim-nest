import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {

  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
