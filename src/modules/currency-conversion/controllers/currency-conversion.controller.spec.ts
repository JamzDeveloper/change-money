import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyConversionController } from './currency-conversion.controller';
import { CurrencyConversionService } from '../services/currency-conversion.service';

describe('CurrencyConversionController', () => {
  let controller: CurrencyConversionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyConversionController],
      providers: [CurrencyConversionService],
    }).compile();

    controller = module.get<CurrencyConversionController>(
      CurrencyConversionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
