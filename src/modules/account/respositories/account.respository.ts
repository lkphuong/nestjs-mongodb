import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from '../schema/account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync } from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/index.exception';
@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<AccountDocument>,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  async findByID(id: string): Promise<Account> {
    return await this.accountModel.findById(id);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const account = await this.accountModel
      .findOne({ username: loginDto.username })
      .select('+password');

    if (!account) throw new NotFoundException(1001, 'Người dùng không tồn tại');

    const isMatch = compareSync(loginDto.password, account.password);

    if (!isMatch)
      throw new BadRequestException(
        1001,
        'Username hoặc mật khẩu không chính xác',
      );
    return account;
  }
}
