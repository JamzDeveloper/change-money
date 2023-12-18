import { Module } from '@nestjs/common';
import { CurrencyConversionService } from './services/currency-conversion.service';
import { CurrencyConversionController } from './controllers/currency-conversion.controller';
import { RedisModule } from 'src/database/redis.module';
import { TypeChangeService } from './services/type-change.service';
import { TypeChangeController } from './controllers/type-change.controller';

@Module({
  imports: [RedisModule],
  controllers: [CurrencyConversionController, TypeChangeController],
  providers: [CurrencyConversionService, TypeChangeService],
})
export class CurrencyConversionModule {}
