import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstname!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastname!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password!: string;
}
