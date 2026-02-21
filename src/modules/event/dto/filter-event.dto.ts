import { IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class FilterEventDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  caseId?: string;

  @IsOptional()
  @ApiProperty()
  eventType?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  @ApiProperty()
  status?: string;
}
