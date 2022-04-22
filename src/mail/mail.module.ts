import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from 'src/modules/account/account.module';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    MailerModule.forRoot({
      transport: {
        service: process.env.SERVICE,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      },
      defaults: {
        from: process.env.EMAIL,
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService, JwtStrategy],
  exports: [MailService],
})
export class MailModule {}
