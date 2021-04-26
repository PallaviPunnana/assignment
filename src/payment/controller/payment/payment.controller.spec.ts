import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from 'src/payment/service/payment/payment.service';
import { PaymentController } from './payment.controller';

describe('PaymentController', () => {
  let controller: PaymentController;
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [PaymentService]
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
    service = module.get<PaymentService>(PaymentService);
  });
  describe('createPayment', () => {
    it('should return transacation')
  })
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
