import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'obtaining the correct token ' })
  getToken(@Body('username') username: string) {
    return this.authService.getToken(username);
    // return this.authService.generateToken('username');
  }
}
