import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrencyConversionService } from '../services/currency-conversion.service';
import { CreateCurrencyConversionDto } from '../dtos/create-curreny-conversion.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from 'src/modules/users/model';

@Controller('currency-conversion')
@UseGuards(JwtAuthGuard)
export class CurrencyConversionController {
  constructor(
    private readonly currencyConversionService: CurrencyConversionService,
  ) {}

  @Get()
  history(@CurrentUser() user: User) {
    return this.currencyConversionService.history(user);
  }
  @Post()
  conversion(
    @CurrentUser() user: User,
    @Body() dataConversion: CreateCurrencyConversionDto,
  ) {
    return this.currencyConversionService.conversion(dataConversion, user);
  }
}
