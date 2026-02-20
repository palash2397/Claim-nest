import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityLogDto {

  @ApiProperty()
  @IsMongoId()
  caseId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  activity: string;
}
