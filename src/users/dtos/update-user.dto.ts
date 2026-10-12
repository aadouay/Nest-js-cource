import { IsOptional, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  last_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password?: string;
}
