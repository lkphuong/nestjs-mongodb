import { UseGuards, Controller, Post, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt_auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local_auth.guard';
import { Public } from 'src/common/decorators/auth/public.decoration';
import { ResponseHelper } from 'src/common/helpers/response.helper';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    const token = await this.authService.login(req.user);
    return new ResponseHelper().success(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
