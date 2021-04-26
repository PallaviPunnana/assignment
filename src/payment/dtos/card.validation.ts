import { ValidatorConstraintInterface, ValidatorConstraint, ValidationArguments } from 'class-validator';
import { CardIssuers } from '../config';

@ValidatorConstraint()
export class CardValidator implements ValidatorConstraintInterface {
    validate(value: string, validationArguments: ValidationArguments) {
        const input = validationArguments.object as any;
        const prefix1 = value.slice(0, 1);
        const prefix2 = value.slice(0, 2);
        const prefix3 = value.slice(0, 4);
        const length = value.length;
        const cardName = CardIssuers.filter(card =>
            card.prefixes.includes(prefix1) && card.length.includes(length) ||
            card.prefixes.includes(prefix2) && card.length.includes(length) ||
            card.prefixes.includes(prefix3) && card.length.includes(length));
        if (cardName.length === 0) {
            return false;
        } else {
            // calculate checksum
            let checkSum = 0;
            let isSecond = false;
            for (let i = length - 1; i >= 0; i--) {
                let d = parseInt(value.charAt(i));
                if (isSecond == true)
                    d = d * 2;
                checkSum += Math.floor(d / 10);
                checkSum += d % 10;
                isSecond = !isSecond;
            }
            if((checkSum % 10 == 0)) {
                input.cardName = cardName[0].name;
                return true;
            }
            else {
                return false;
            }
        }
    }
}