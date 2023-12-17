import { Injectable } from '@nestjs/common';

import { RedisService } from './database/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async setData(key: string, value: string) {
    await this.redisService.setData(key, value);

    return;
  }
  async getData(key: string) {
    const data = await this.redisService.getData(key);

    console.log(data);
    return data;
  }
}
