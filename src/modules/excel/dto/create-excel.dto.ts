import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadExcelDto {

  @IsString()
  @ApiProperty()
  sheetName: string;

  @IsEnum(['Contacts', 'Tasks', 'PNCs', 'Cases'])
  @ApiProperty()
  sheetType: 'Contacts' | 'Tasks' | 'PNCs' | 'Cases';


  
}
