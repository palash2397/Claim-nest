import { IsNotEmpty, IsString } from 'class-validator';

export class AddActivityDto {
  @IsNotEmpty()
  @IsString()
  activity: string;
}
