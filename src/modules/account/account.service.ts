import { Injectable } from '@nestjs/common';
import { AccountRepository } from './respositories/account.respository';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CreateAccountDto } from './dto';
import { ObjectId } from 'mongodb';
@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findOne(loginDto: LoginDto) {
    return await this.accountRepository.login(loginDto);
  }

  async findById(id: string) {
    return await this.accountRepository.findByID(id);
  }

  async findByRFToken(token: string) {
    return await this.accountRepository.findByRFToken(token);
  }

  async create(createAccountDto: CreateAccountDto) {
    return await this.accountRepository.createAccount(createAccountDto);
  }

  async updateRefreshToken(_id: ObjectId, token: string) {
    return await this.accountRepository.updateRFToken(_id, token);
  }
}
