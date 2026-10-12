import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserInfo {
  firstname?: string;
  lastname?: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
