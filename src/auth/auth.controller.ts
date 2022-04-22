import { UseGuards, Controller, Post, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt_auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local_auth.guard';
import { Public } from 'src/common/decorators/auth/public.decoration';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
