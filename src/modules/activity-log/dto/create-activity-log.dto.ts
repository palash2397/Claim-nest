import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityLogDto {

  @IsMongoId()
  caseId: string;

  @IsNotEmpty()
  @IsString()
  activity: string;
}
