import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}
  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.accountService.findOne(loginDto);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { role: user.role, _id: user._id };
    const refresh_token = await this.jwtService.sign(
      { _id: user._id },
      {
        secret: process.env.JWT_SECRET_REFRESH,
        expiresIn: process.env.JWT_EXPIRES_REFRESH,
      },
    );

    // update rf token
    await this.accountService.updateRefreshToken(user._id, refresh_token);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token,
    };
  }
}
