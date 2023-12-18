import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  // @UseGuards(JwtAuthGuard)
  getToken(@Body('username') username: string) {
    return this.authService.getToken(username);
    // return this.authService.generateToken('username');
  }
}
