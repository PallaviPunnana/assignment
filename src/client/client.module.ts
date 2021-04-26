import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SECRET_KEY } from './config';
import { ClientController } from './controller/client/client.controller';
import { AuthService } from './service/auth/auth.service';
import { PassportJwtService } from './service/auth/jwt.service';
import { PassportLocalService } from './service/auth/local.service';
import { ClientService } from './service/client/client.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: {
        expiresIn: '7days'
      }
    }),
  ],
  controllers: [ClientController],
  providers: [ClientService, AuthService, PassportJwtService, PassportLocalService]
})
export class ClientModule {}
