import { Injectable } from '@nestjs/common';
import { AccountRepository } from './respositories/account.respository';
import { LoginDto } from 'src/auth/dto/login.dto';
@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOne(loginDto: LoginDto) {
    return await this.accountRepository.login(loginDto);
  }

  async findById(id: string) {
    return await this.accountRepository.findByID(id);
  }
}
