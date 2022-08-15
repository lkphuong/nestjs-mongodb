import { Injectable } from '@nestjs/common';
import { Account, AccountDocument } from '../schema/account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/index.exception';
import { CreateAccountDto } from '../dto';
import { ObjectId } from 'mongodb';
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
    const isMatch = await bcrypt.compare(loginDto.password, account.password);
    // console.log(loginDto.password, account.password);
    // if (!isMatch)
    //   throw new BadRequestException(
    //     1001,
    //     'Username hoặc mật khẩu không chính xác',
    //   );
    return account;
  }

  async createAccount(createAccountDto: CreateAccountDto): Promise<any> {
    createAccountDto.password = await bcrypt.hash(
      createAccountDto.password,
      process.env.SALT,
    );
    return this.accountModel.create(createAccountDto);
  }

  async updateRFToken(_id: ObjectId, token: string) {
    return await this.accountModel.findOneAndUpdate(
      _id,
      { rf_token: token },
      { new: true },
    );
  }
}
