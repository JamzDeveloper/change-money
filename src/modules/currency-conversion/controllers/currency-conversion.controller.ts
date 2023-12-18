import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CurrencyConversionService } from '../services/currency-conversion.service';
import { CreateCurrencyConversionDto } from '../dtos/create-curreny-conversion.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from 'src/modules/users/model';
import { CreateTypeChangeDto } from '../dtos/create-type-change.dto';
import { TypeChangeService } from '../services/type-change.service';

@Controller('currency-conversion')
@UseGuards(JwtAuthGuard)
export class CurrencyConversionController {
  constructor(
    private readonly currencyConversionService: CurrencyConversionService,
    private readonly typeChangeService: TypeChangeService,
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
  @Post('type-change')
  addTypechange(@Body() createTypeChangeDto: CreateTypeChangeDto) {
    return this.typeChangeService.addTypeChange(createTypeChangeDto);
  }

  @Get('type-change')
  allTypechange() {
    return this.typeChangeService.allTypeChange();
  }

  @Put('type-change')
  updateTypeChange(@Body() updateTypeChangeDto: CreateTypeChangeDto) {
    return this.typeChangeService.updateTypeChange(updateTypeChangeDto);
  }
}
