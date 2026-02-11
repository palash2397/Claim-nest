import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AddDocumentDto {
  @IsNotEmpty()
  @IsString()
  caseId: string;
  
  @IsNotEmpty()
  @IsString()
  fileName: string; // generated on frontend or backend

  @IsNotEmpty()
  @IsString()
  originalName: string; // name user selected

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

  @IsNotEmpty()
  @IsString()
  mimeType: string;

  size: number;
}
