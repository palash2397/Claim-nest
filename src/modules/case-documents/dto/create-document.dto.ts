import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

export class AddDocumentDto {

  @IsMongoId()
  caseId: string;

  @IsEnum([
    'IWJ Documents',
    'Dept Letters',
    'Draft Copies',
    'Medical',
    'Vocational',
    'WSF',
    'SI CFU',
  ])
  category: string;

  @IsOptional()
  @IsString()
  description?: string;
}
