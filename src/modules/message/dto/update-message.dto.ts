import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class UpdateMessageDto {
  @IsMongoId()
  @IsOptional()
  id: string;

  @IsMongoId()
  @IsOptional()
  from: string;

  @IsMongoId()
  @IsOptional()
  caseId: string;

  @IsString()
  @IsOptional()
  message: string;
}
