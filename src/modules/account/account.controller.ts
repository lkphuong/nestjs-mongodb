import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Public, Roles } from 'src/common/decorators/auth/public.decoration';
import { ACCOUNT_TYPE } from 'src/common/enums/account_type.enum';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Public()
  @HttpCode(201)
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto);
  }

  @Roles(ACCOUNT_TYPE.USER)
  @HttpCode(200)
  @Get()
  async getHello() {
    return 'Hello NestJs';
  }

  @Roles(ACCOUNT_TYPE.ADMIN)
  @HttpCode(200)
  @Get('admin')
  async getHelloAdmin() {
    return 'Hello Admin NestJs';
  }
}
