import { IsEnum, IsMongoId, IsOptional } from 'class-validator';


export class FilterEventDto {
  @IsOptional()
  @IsMongoId()
  caseId?: string;

  @IsOptional()
  eventType?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status?: string;
}
