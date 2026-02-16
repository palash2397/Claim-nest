import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeLossDto } from './create-time-loss.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTimeLossDto extends PartialType(CreateTimeLossDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
