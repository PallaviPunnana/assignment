import { Body, Controller, Get, HttpStatus, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/client/service/auth/passport.jwt-guard';
import { CreatePaymentDto } from 'src/payment/dtos/CreatePaymentDto';
import { GetPaymentDto } from 'src/payment/dtos/GetPaymentDto';
import { PaymentService } from 'src/payment/service/payment/payment.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService: PaymentService
    ) {}
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createPayment(
        @Req() req,
        @Body() input: CreatePaymentDto,
        @Res() res
    ) {
        try {
            const client = req.user;
            const transaction = this.paymentService.createPayment({...input, clientId: client.id});
            res.status(HttpStatus.OK).send({ data: transaction });
        } catch (e) {
            console.log(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error. Please try again later' });
        }
    }
    @Get('/id')
    async getPayment(
        @Req() req,
        @Query() input: GetPaymentDto,
        @Res() res
    ) {
        try {
            const transaction = this.paymentService.getPayment(input.id);
            res.status(HttpStatus.OK).send({ data: transaction });
        } catch (e) {
            console.log(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error. Please try again later' });
        }
    }

}
