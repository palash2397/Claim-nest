import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateCaseContactDto {

  @IsMongoId()
  caseId: string;

  @IsMongoId()
  contactId: string;

  @IsString()
  roleOnCase: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsString()
  caseNotes?: string;
}
