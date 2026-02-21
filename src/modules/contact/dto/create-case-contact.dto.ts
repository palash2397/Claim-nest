import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseContactDto {

  @IsMongoId()
  @ApiProperty()
  caseId: string;

  @IsMongoId()
  @ApiProperty()
  contactId: string;

  @IsString()
  @ApiProperty()
  roleOnCase: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isPrimary?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty()
  caseNotes?: string;
}
