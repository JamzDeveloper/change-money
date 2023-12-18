import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './estrategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from 'src/database/redis.module';

@Module({
  imports: [
    ConfigModule,
    RedisModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServices: ConfigService) => {
        return {
          secret: configServices.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configServices.get('JWT_TIME_EXPIRATION'),
          },
        };
      },
    }),

    forwardRef(() =>
      PassportModule.register({
        defaultStrategy: 'jwt',
      }),
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, JwtModule, PassportModule, AuthService],
})
export class AuthModule {}
