import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/database/redis.service';
import { CreateCurrencyConversionDto } from '../dtos/create-curreny-conversion.dto';
import Big from 'big.js';
import { generateCode } from 'src/common/helpers';
import { User } from 'src/modules/users/model';
import { CreateTypeChangeDto } from '../dtos/create-type-change.dto';

@Injectable()
export class CurrencyConversionService {
  constructor(private readonly redisService: RedisService) {}

  async conversion(dataConversion: CreateCurrencyConversionDto, user: User) {
    const keyConversionDirect = `conversion:${dataConversion.sourceCurrency}:${dataConversion.targetCurrency}`;

    const responseData = {
      ...dataConversion,
      amountChange: '',
      typeChange: '',
    };

    const conversionExists =
      await this.redisService.existDataWithKey(keyConversionDirect);
    if (conversionExists) {
      const conversionAmount =
        await this.redisService.getData(keyConversionDirect);
      responseData.typeChange = conversionAmount;
      console.log(conversionAmount);
      responseData.amountChange = new Big(dataConversion.amount)
        .times(conversionAmount)
        .toString();
      return responseData;
    }

    const amountSourceCurrency = await this.redisService.getData(
      `money:${dataConversion.sourceCurrency}`,
    );

    const amountTargetCurrency = await this.redisService.getData(
      `money:${dataConversion.targetCurrency}`,
    );

    responseData.typeChange = new Big(amountTargetCurrency)
      .div(amountSourceCurrency)
      .toString();

    responseData.amountChange = new Big(dataConversion.amount)
      .times(responseData.typeChange)
      .toString();

    const newKey = await this.generateKey(user.username);
    await this.redisService.setDataObject(newKey, responseData);

    return responseData;
  }

  async history(user: User) {
    return this.redisService.allDataObject(`change:${user.username}:*`);
  }

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

  private async generateKey(username: string) {
    console.log(username);
    let existsKey = true;
    let newKey = '';
    do {
      newKey = `change:${username}:${generateCode()}`;
      existsKey = await this.redisService.existDataWithKey(newKey);
    } while (existsKey);
    console.log(newKey);
    return newKey;
  }
}
