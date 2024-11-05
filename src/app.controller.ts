import { Controller, Get } from '@nestjs/common';
import { Position } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<Position[]> {
    return this.appService.getHello();
  }
}
