import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';

import { CreateTypeChangeDto } from '../dtos/create-type-change.dto';
import { TypeChangeService } from '../services/type-change.service';

@Controller('currency-conversion/type-change')
@UseGuards(JwtAuthGuard)
export class TypeChangeController {
  constructor(private readonly typeChangeService: TypeChangeService) {}

  @Post()
  addTypechange(@Body() createTypeChangeDto: CreateTypeChangeDto) {
    return this.typeChangeService.addTypeChange(createTypeChangeDto);
  }

  @Get()
  allTypechange() {
    return this.typeChangeService.allTypeChange();
  }

  @Put()
  updateTypeChange(@Body() updateTypeChangeDto: CreateTypeChangeDto) {
    return this.typeChangeService.updateTypeChange(updateTypeChangeDto);
  }
}
