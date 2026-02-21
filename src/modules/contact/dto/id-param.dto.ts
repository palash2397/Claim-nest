import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdParamDto {
  @IsMongoId()
  @ApiProperty()
  id: string;
}