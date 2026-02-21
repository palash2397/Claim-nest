import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeLossDto } from './create-time-loss.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTimeLossDto extends PartialType(CreateTimeLossDto) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}
