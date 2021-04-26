import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { BuyerModule } from './buyer/buyer.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ClientModule, BuyerModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
