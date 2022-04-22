import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from './views/reset_password';
import { AccountService } from 'src/modules/account/account.service';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized.exception';

@Injectable()
export class MailService {
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
  ) {}
  async sendEmail(email: any) {
    const user = await this.accountService.findById(email); // đổi lại service
    if (!user) throw new UnauthorizedException(1001);
    const token = await this.jwtService.sign(
      { email: email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.MAIL_EXPIRES_IN,
      },
    );
    const url = `http://localhost:3000/user/resetPassword/${token}`;
    //custome
    await sendEmail(email, url);
  }
}
