import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateMessageDto {
  @IsMongoId()
  @IsNotEmpty()
  from: string;

  @IsMongoId()
  @IsNotEmpty()
  regarding: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
