import { Module } from '@nestjs/common';
import { TimeLossService } from './time-loss.service';
import { TimeLossController } from './time-loss.controller';

@Module({
  controllers: [TimeLossController],
  providers: [TimeLossService],
})
export class TimeLossModule {}
