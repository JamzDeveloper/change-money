import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './database/redis.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CurrencyConversionModule } from './modules/currency-conversion/currency-conversion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule,
    AuthModule,
    UsersModule,
    CurrencyConversionModule,
  ],
})
export class AppModule {}
