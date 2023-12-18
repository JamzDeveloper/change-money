import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/database/redis.service';
import { CreateTypeChangeDto } from '../dtos/create-type-change.dto';

@Injectable()
export class TypeChangeService {
  constructor(private readonly redisService: RedisService) {}

  async addTypeChange(createTypeChangeDto: CreateTypeChangeDto) {
    const key = `conversion:${createTypeChangeDto.sourceCurrency.toLocaleLowerCase()}:${createTypeChangeDto.targetCurrency.toLocaleLowerCase()}`;
    if (await this.redisService.existDataWithKey(key)) {
      throw new BadRequestException(`exchange rate already exists`);
    }
    await this.redisService.setData(key, createTypeChangeDto.amount.toString());
  }

  async allTypeChange() {
    return this.redisService.allDataObject(`conversion:*:*`);
  }
  async updateTypeChange(updateTypeChangeDto: CreateTypeChangeDto) {
    const key = `conversion:${updateTypeChangeDto.sourceCurrency.toLocaleLowerCase()}:${updateTypeChangeDto.targetCurrency.toLocaleLowerCase()}`;
    if (!(await this.redisService.existDataWithKey(key))) {
      throw new BadRequestException(`exchange rate does not exist`);
    }
    await this.redisService.setData(key, updateTypeChangeDto.amount.toString());
  }
}
