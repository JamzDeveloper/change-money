import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
// import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body('key') key: string) {
    return this.appService.getData(key);
  }

  @Post()
  setData(@Body('key') key: string, @Body('value') value: string) {
    return this.appService.setData(key, value);
  }
}
