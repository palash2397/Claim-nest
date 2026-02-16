import { Controller } from '@nestjs/common';
import { TimeLossService } from './time-loss.service';

@Controller('time-loss')
export class TimeLossController {
  constructor(private readonly timeLossService: TimeLossService) {}
}
