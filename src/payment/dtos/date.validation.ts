import { ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint()
export class DateValidator implements ValidatorConstraintInterface {
    validate(value: string) {
        let [month, year] = value.split("/");
        let expiryDay = new Date(parseInt(year), parseInt(month), 1);
        let today = new Date();
        if (expiryDay > today) {
            return true
        }
        else return false;
    }
}