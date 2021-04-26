import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) {}

    async generatePayload(client: any) {
        const payload = {name: client.name, id: client.id};
        return this.jwtService.sign(payload);
    }
}
