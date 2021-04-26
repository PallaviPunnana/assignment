import { Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Errors } from 'src/client/config';
import { AuthService } from 'src/client/service/auth/auth.service';
import { JwtAuthGuard } from 'src/client/service/auth/passport.jwt-guard';
import { LocalAuthGuard } from 'src/client/service/auth/passport.local-guard';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('client')
@Controller('client')
export class ClientController {
    constructor(
        private authService: AuthService,
    ) {}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async verifyPassword(
        @Req() req,
        @Res() res
    ) {
        try {
            const client = req.user;
            const accessToken = await this.authService.generatePayload(client);
            res.status(HttpStatus.OK).send({ data: accessToken });
        } catch (e) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error. Please try again later' });
        }
    }
    // @UseGuards(JwtAuthGuard)
    // @Get('getAuth')
    // async getAuth(
    //     @Req() req,
    //     @Res() res
    // ) {
    //     try {
    //         const user = req.user;
    //         res.status(HttpStatus.OK).send({ user });
    //     } catch (e) {
    //         res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Internal server error. Please try again later' });
    //     }
    // }
}
