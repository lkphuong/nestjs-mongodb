import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/auth/public.decoration';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Public()
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto) {
    return await this.accountService.create(createAccountDto);
  }
}
