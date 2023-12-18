import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/database/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}
  async validateUser(id: string) {
    if (!(await this.redisService.existDataWithKey(id))) {
      throw new UnauthorizedException();
    }
    const user = await this.redisService.getDataObject(id);

    return user;
  }

  generateToken(payload: JwtPayload) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getToken(username: string) {
    const key = `username:${username.trim().toLocaleLowerCase()}`;

    await this.redisService.getData(key);

    const tokens = this.generateToken({ id: key });

    return tokens;
  }
}
