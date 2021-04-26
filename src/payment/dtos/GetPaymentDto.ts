import {IsNotEmpty, IsUUID} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger';

export class GetPaymentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    id: string;
}
