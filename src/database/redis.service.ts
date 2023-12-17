import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setData(key: string, value: string) {
    await this.cacheManager.set(key, value);

    return;
  }
  async getData(key: string) {
    const data = await this.cacheManager.get(key);

    console.log(data);
    return data;
  }
}
