export interface IPaymentType {
    clientId: number;
    buyer: IBuyer;
    payment: IPayment;
}
interface IBuyer {
    name: string;
    email: string;
    cpf: string;
}
interface IPayment {
    amount: number;
    type: string;
    card?: ICard;
}
interface ICard {
    cardHolderName: string;
    cardNumber: string;
    cardExpirationDate: string;
    cardCVV: string;
}

export interface ITransaction {
    transactionId: string;
    sentTo: string;
    sentFrom: string;
    amount: number;
    time?: string;
    status: string;
    type: string;
    expiryDate?: string;
    boleto?: string;
}

export const TransactionStatus = ['success', 'failure'];

export const CardIssuers = [
    {
        name: "Visa",
        length: [13, 16],
        prefixes: ["4"],
    },
    {
        name: "MasterCard",
        length: [16],
        prefixes: ["51", "52", "53", "54", "55"],
    },
    {
        name: "Maestro",
        length: [12, 13, 14, 15, 16, 18, 19],
        prefixes: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763"],
    },
    {
        name: "AmericanExpress",
        length: [15],
        prefixes: ["34", "37"],
    }
]
