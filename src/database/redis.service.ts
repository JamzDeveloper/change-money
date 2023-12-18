import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { DynamicObject, KeyValue } from 'src/types';
import { data, dataConversion } from './assets/convetion-money';

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setData(key: string, value: string) {
    await this.cacheManager.set(key, value);

    return;
  }
  async onModuleInit() {
    const keys = await this.cacheManager.store.keys('money:*');
    const keysConversion = await this.cacheManager.store.keys('conversion:*');
    if (keys.length == 0) {
      await this.insertDataInit(data);
      await this.cacheManager.store.mget(...keys);
    }
    if (keysConversion.length == 0) {
      await this.insertDataInit(dataConversion);
      await this.cacheManager.store.mget(...keysConversion);
    }
  }
  async getData(key: string) {
    const data = (await this.cacheManager.get(key)) as string;

    if (!data) {
      throw new BadRequestException(`data with key:${key} not found`);
    }
    return data;
  }

  // async consultData() {
  //   console.log('consult Data');
  //   // this.insertDataInit();
  //   const keys = await this.cacheManager.store.keys('money:*');
  //   console.log(keys);
  //   const values = await this.cacheManager.store.mget(...keys);
  //   console.log(values);
  // }

  async allDataObject(query: string) {
    const keys = await this.cacheManager.store.keys(query);
    if (keys.length == 0) return;
    const values = await this.cacheManager.store.mget(...keys);
    const combinedArray = keys.map((key, index) => ({
      key,
      value: JSON.parse(values[index] as string),
    }));

    return combinedArray;
  }
  async getDataObject(key: string) {
    const data = await this.getData(key);
    return JSON.parse(data);
  }

  async setDataObject(key: string, data: DynamicObject) {
    const dataString = JSON.stringify(data);
    const result = await this.cacheManager.set(key, dataString);

    return result;
  }

  async existDataWithKey(key: string) {
    const data = await this.cacheManager.get(key);
    return data ? true : false;
  }

  private async insertDataInit(data: Array<KeyValue>) {
    const promiseData = data.map(
      (element) =>
        new Promise(async (resolve) => {
          await this.setData(element.key, element.value.toString());
          resolve(true);
        }),
    );

    await Promise.all(promiseData);
  }
}
