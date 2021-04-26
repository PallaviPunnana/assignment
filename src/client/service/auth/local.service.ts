import {PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from '../client/client.service';

@Injectable()
export class PassportLocalService extends PassportStrategy(Strategy) {
    constructor(
        private readonly clientService: ClientService,
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        });
    }

    async validate( username: string, password: string) {
        try {
            console.log('in pp local', username, password);
            const client = this.clientService.validatePassword(username, password);
            return {
                name: client.name,
                id: client.id
            };
        } catch(e) {
            console.log(e, 'error here')
            throw new UnauthorizedException(e.message);
        }
    }
}
