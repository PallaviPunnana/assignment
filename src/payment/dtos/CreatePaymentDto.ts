import { IsNotEmpty, IsOptional, MaxLength, MinLength, Validate, ValidateNested, IsNumberString, IsEmail } from "class-validator";
import { CardValidator } from "./card.validation";
import { Type } from 'class-transformer';
import { DateValidator } from "./date.validation";
import {ApiProperty} from '@nestjs/swagger';

export class CardDto {
    @ApiProperty()
    @IsNotEmpty()
    cardHolderName: string;
    cardName: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(13)
    @MaxLength(19)
    @Validate(CardValidator, {
        message: 'Please enter valid card number'
    })
    cardNumber: string;
    @ApiProperty()
    @IsNotEmpty()
    @Validate(DateValidator, {
        message: 'The card has reached its expiry date'
    })
    cardExpirationDate: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    @MaxLength(3)
    @MinLength(3)
    cardCVV: string;
}
class Buyer {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    @MaxLength(11)
    @MinLength(11)    
    cpf: string;
}
class Payment {
    @ApiProperty()
    @IsNotEmpty()
    amount: number;
    @ApiProperty({ enum: ['boleto', 'card']})
    @IsNotEmpty()
    type: string;
    @ApiProperty()
    @ValidateNested()
    @IsOptional()
    @Type(() => CardDto)
    card: CardDto;
}
export class CreatePaymentDto {
    @ApiProperty()
    @ValidateNested()
    @IsNotEmpty()
    @Type(() => Buyer)
    buyer: Buyer;
    @ApiProperty()
    @ValidateNested()
    @IsNotEmpty()
    @Type(() => Payment)
    payment: Payment;
}
