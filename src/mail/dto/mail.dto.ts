import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class MailDto {
  @IsDefined({ message: 'Email không được để trống' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail()
  readonly email: string;
}
