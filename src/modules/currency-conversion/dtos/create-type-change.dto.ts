import Big from 'big.js';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeChangeDto {
  @IsNotEmpty()
  amount: Big;

  @IsNotEmpty()
  @IsString()
  sourceCurrency: string;

  @IsNotEmpty()
  @IsString()
  targetCurrency: string;
}
