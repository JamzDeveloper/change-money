import { Module } from '@nestjs/common';
import { CurrencyConversionService } from './services/currency-conversion.service';
import { CurrencyConversionController } from './controllers/currency-conversion.controller';
import { RedisModule } from 'src/database/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [CurrencyConversionController],
  providers: [CurrencyConversionService],
})
export class CurrencyConversionModule {}
