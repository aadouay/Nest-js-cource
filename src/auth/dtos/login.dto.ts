import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckInputValidation {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email!: string;
  @IsNotEmpty()
  @IsString()
  password!: string;
}
