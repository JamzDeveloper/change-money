import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyConversionService } from './currency-conversion.service';

describe('CurrencyConversionService', () => {
  let service: CurrencyConversionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyConversionService],
    }).compile();

    service = module.get<CurrencyConversionService>(CurrencyConversionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
