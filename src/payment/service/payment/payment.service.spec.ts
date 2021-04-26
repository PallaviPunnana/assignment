import { Test, TestingModule } from '@nestjs/testing';
import { IPaymentType } from 'src/payment/config';
import { PaymentService } from './payment.service';

class PaymentServiceMock {
  createPayment(payment: IPaymentType) {
    return {
      status: 'success',
      transactionId: '1234'
    }
  }
  getPayment(id: string) {
    return {
      transactionId: '1234',
      sentTo: 'abc',
      sentFrom: 'pqr',
      amount: 500,
      status: 'success' || 'failure' || 'pending',
      type: 'card'|| 'boleto',
    }
  }
}

describe('PaymentService', () => {
  let service: PaymentService;
  beforeEach(async () => {
    const ServiceProvider = {
      provide: PaymentService,
      useClass: PaymentServiceMock
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, ServiceProvider],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });
  it('payment service should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createPayment', () => {
    it('testing create payment method', () => {
      let CreateInfo = {
        "clientId": 1,
        "buyer": {
          "name": "abc",
          "email": "abc@gmail.com",
          "cpf": "XXXXX"
        },
        "payment": {
          "amount": 100,
          "type": "card",
          "card": {
            "cardHolderName": "abcde",
            "cardNumber": "371449635398431",
            "cardExpirationDate": "XX/XXXX",
            "cardCVV": "XXX"
          }
        }
      }
      const result = { transactionId: '1234', status: 'success' }
      expect(service.createPayment(CreateInfo)).toEqual(result);
    })
  })
  describe('getPayment', () => {
    it('testing getPayment method', () => {
      let id = '1234'
    const result = {
      transactionId: '1234',
      sentTo: 'abc',
      sentFrom: 'pqr',
      amount: 500,
      status: 'success',
      type: 'card',
    };
    expect(service.getPayment(id)).toEqual(result);
    })
  })
});
