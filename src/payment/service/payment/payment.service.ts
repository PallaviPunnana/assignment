import { Injectable } from '@nestjs/common';
import { ClientInfo } from '../../../client/config';
import { IPaymentType, ITransaction, TransactionStatus } from '../../config';
import { uuid } from 'uuidv4';
import * as moment from 'moment';

@Injectable()
export class PaymentService {
    private paymentArray = [];
    createPayment(transaction: IPaymentType) {
        let transactionData = {} as ITransaction;
        let result = {} as any;
        transactionData.transactionId = uuid();
        result.transactionId = transactionData.transactionId;
        transactionData.sentTo = (ClientInfo.filter(client => client.id === transaction.clientId)[0]).name;
        transactionData.sentFrom = transaction.buyer.name;
        transactionData.type = transaction.payment.type;
        transactionData.amount = transaction.payment.amount;
        if (transaction.payment.type === 'boleto') {
            transactionData.status = 'pending';
            transactionData.boleto = this.generateBoleto();
            transactionData.expiryDate = moment().add(3, 'days').format('DD-MM-YYYY')
            result.boleto = transactionData.boleto;
        }
        if (transaction.payment.type === 'card') {
            transactionData.status = TransactionStatus[Math.floor(Math.random()*2)];
            transactionData.time = moment(new Date()).format('DD-MM-YYYY HH:MM:SS');
            result.status = transactionData.status;
        }
        this.paymentArray.push(transactionData);
        return result;
    }
    generateBoleto() {
        return Math.floor(10000 + Math.random() * 90000).toString() + '.' +
            Math.floor(10000 + Math.random() * 90000).toString() + ' ' +
            Math.floor(10000 + Math.random() * 90000).toString() + '.' +
            Math.floor(100000 + Math.random() * 900000).toString() + ' ' +
            Math.floor(10000 + Math.random() * 90000).toString() + '.' +
            Math.floor(10000 + Math.random() * 90000).toString() + ' ' +
            Math.floor(1 + Math.random() * 9).toString() + ' ' +
            Math.floor(Math.pow(10, 14) + Math.random() * 9).toFixed().toString();

    }
    getPayment(id: string) {
        console.log(this.paymentArray, 'payment array');
        return this.paymentArray.filter(payment => payment.transactionId === id)[0]
    }
}
