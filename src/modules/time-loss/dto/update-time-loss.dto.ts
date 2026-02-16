import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeLossDto } from './create-time-loss.dto';

export class UpdateTimeLossDto extends PartialType(
  CreateTimeLossDto,
) {}
