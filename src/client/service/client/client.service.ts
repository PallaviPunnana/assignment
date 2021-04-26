import { Injectable } from '@nestjs/common';
import { ClientInfo, Errors } from 'src/client/config';

@Injectable()
export class ClientService {
    validatePassword(username: string, password: string) {
        console.log('user name', username, 'password', password);
        const value = ClientInfo.filter(client => client.username === username && client.password === password
        );
        console.log(value, 'in service');
        if (value.length === 0) {
            throw new Error(Errors.Unauthorized)
        }
        return value[0];
    }
}
