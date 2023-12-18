import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/database/redis.service';
import { CreateCurrencyConversionDto } from '../dtos/create-curreny-conversion.dto';
import Big from 'big.js';
import { generateCode } from 'src/common/helpers';
import { User } from 'src/modules/users/model';

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

  private async generateKey(username: string) {
    let existsKey = true;
    let newKey = '';
    do {
      newKey = `change:${username}:${generateCode()}`;
      existsKey = await this.redisService.existDataWithKey(newKey);
    } while (existsKey);
    return newKey;
  }
}
