import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  from: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  caseId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
