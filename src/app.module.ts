import { Module } from '@nestjs/common';
import { UrlShortModule } from './urlShort/urlShort.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    UrlShortModule,
    UserModule,
    ConfigModule.forRoot(),
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
