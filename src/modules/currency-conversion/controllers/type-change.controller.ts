import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';

import { CreateTypeChangeDto } from '../dtos/create-type-change.dto';
import { TypeChangeService } from '../services/type-change.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('type-change')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized Beare Auth' })
@Controller('currency-conversion/type-change')
@UseGuards(JwtAuthGuard)
export class TypeChangeController {
  constructor(private readonly typeChangeService: TypeChangeService) {}

  @ApiCreatedResponse({ description: 'correct creation' })
  @Post()
  addTypechange(@Body() createTypeChangeDto: CreateTypeChangeDto) {
    return this.typeChangeService.addTypeChange(createTypeChangeDto);
  }

  @Get()
  @ApiOkResponse({ description: 'obtencion correcta de datos' })
  allTypechange() {
    return this.typeChangeService.allTypeChange();
  }

  @Put()
  @ApiOkResponse({ description: 'successfully updated' })
  updateTypeChange(@Body() updateTypeChangeDto: CreateTypeChangeDto) {
    return this.typeChangeService.updateTypeChange(updateTypeChangeDto);
  }
}
