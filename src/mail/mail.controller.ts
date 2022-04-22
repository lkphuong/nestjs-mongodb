import { Body, Controller, HttpCode, Post, Response } from '@nestjs/common';
import { Public } from 'src/common/decorators/auth/public.decoration';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  @Public()
  @HttpCode(200)
  @Post()
  async sendMail(@Response() res, @Body() mailDto: MailDto) {
    await this.mailService.sendEmail(mailDto.email);
    return new ResponseHelper(res).success({});
  }
}
