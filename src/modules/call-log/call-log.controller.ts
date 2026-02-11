import { Controller } from '@nestjs/common';
import { CallLogService } from './call-log.service';

@Controller('call-log')
export class CallLogController {
  constructor(private readonly callLogService: CallLogService) {}
}
