import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { RedisModule } from 'src/database/redis.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [RedisModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
