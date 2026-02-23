import { IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateGroupDto {
  
 
  @ApiProperty()
  @IsString()
  title: string;

  
  @ApiProperty()
  @IsMongoId()
  participants: string[];
}
