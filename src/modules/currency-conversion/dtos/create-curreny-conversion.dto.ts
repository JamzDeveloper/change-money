import { IsNotEmpty, IsString } from 'class-validator';
import Big from 'big.js';

export class CreateCurrencyConversionDto {
  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  @IsString()
  sourceCurrency: string;

  @IsNotEmpty()
  @IsString()
  targetCurrency: string;
}
