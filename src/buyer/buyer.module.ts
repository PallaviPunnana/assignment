import { Module } from '@nestjs/common';
import { BuyerService } from './service/buyer/buyer.service';
import { BuyerController } from './controller/buyer/buyer.controller';

@Module({
  providers: [BuyerService],
  controllers: [BuyerController]
})
export class BuyerModule {}
