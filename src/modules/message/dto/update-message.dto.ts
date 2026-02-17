import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
