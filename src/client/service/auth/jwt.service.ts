import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { SECRET_KEY } from 'src/client/config';

@Injectable()
export class PassportJwtService extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_KEY,
        });
    }

    async validate(payload: any) {
        return { name: payload.name, id: payload.id }
    }
}
