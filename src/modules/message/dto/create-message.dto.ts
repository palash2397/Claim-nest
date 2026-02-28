import { IsNotEmpty, IsString, IsMongoId, IsBoolean } from 'class-validator';
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

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  assignTo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
}
