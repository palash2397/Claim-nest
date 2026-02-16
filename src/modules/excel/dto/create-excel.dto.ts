import { IsEnum, IsString } from 'class-validator';

export class UploadExcelDto {

  @IsString()
  sheetName: string;

  @IsEnum(['Contacts', 'Tasks', 'PNCs', 'Cases'])
  sheetType: 'Contacts' | 'Tasks' | 'PNCs' | 'Cases';
}
