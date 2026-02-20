import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,

} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: '',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;


  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
 
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  role: string;

}
