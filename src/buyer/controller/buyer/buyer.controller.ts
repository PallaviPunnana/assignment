import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { CardDto, CreatePaymentDto } from 'src/payment/dtos/CreatePaymentDto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('buyer')
@Controller('buyer')
export class BuyerController {
    @Post('checkCard')
    async createPayment(
        @Body() input: CardDto,
        @Res() res
    ) {
        try {
            res.status(HttpStatus.OK).send({ cardIssuedBy: input.cardName });
        } catch (e) {
            console.log(e);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error. Please try again later' });
        }
    }
}
