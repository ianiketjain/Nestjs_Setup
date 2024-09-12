import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("/v1")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }

  @Post('error')
  getError(@Body() body: { name: string }) {
    return this.appService.getError(body);
  }
}
