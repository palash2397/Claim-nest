import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  from: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  caseId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  assignTo: string;
}
