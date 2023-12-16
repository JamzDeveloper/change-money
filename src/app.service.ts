import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  getHello(): string {
    return 'Hello World!';
  }

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
