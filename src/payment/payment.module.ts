import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment/payment.controller';
import { PaymentService } from './service/payment/payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
