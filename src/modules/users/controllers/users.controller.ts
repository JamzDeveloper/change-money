import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dataUser: CreateUserDto) {
    return this.usersService.create(dataUser);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Body('username') username: string) {
    return this.usersService.findUser(username);
  }
}
