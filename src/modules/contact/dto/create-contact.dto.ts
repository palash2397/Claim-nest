import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ContactType } from '../schemas/contact.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  company?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  primaryPhone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  secondaryPhone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  addressLine1?: string;

  
  @IsOptional()
  @IsString()
  @ApiProperty()
  addressLine2?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  city?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  state?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  zipCode?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  status?: string;

  @IsEnum(ContactType)
  @ApiProperty()
  contactType: ContactType;
}
