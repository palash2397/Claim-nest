import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return 'backend is running!';
  }

  @Get('health')
  health() {
    return 'OK';
  }
}
