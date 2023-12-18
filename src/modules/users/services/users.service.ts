import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/database/redis.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly redisClient: RedisService,
    private readonly authService: AuthService,
  ) {}

  async create(data: CreateUserDto) {
    const { username } = data;

    const key = `username:${username.toLocaleLowerCase()}`;

    if (await this.redisClient.existDataWithKey(key)) {
      throw new BadRequestException(
        `A user already exists with the username:${username}`,
      );
    }

    await this.redisClient.setDataObject(key, data);

    const tokens = this.authService.generateToken({
      id: key,
    });

    return {
      ...tokens,
      ...data,
    };
  }

  async findUser(username: string) {
    const data = this.redisClient.getDataObject(`username:${username}`);

    return data;
    // this.redisClient.consultData();
    // return username;
  }
}
