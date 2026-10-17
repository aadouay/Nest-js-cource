import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CheckInputValidation } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async logInValidation(input: CheckInputValidation) {
    const user = await this.userService.findByEmailForAuth(input.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const pass_valid = await bcrypt.compare(input.password, user.password);
    if (!pass_valid)
      throw new UnauthorizedException('Invalid email or password');
    return {
      id: user.id,
      email: user.email,
    };
  }

  async logIn(input: CheckInputValidation) {
    const user = await this.logInValidation(input);

    // learning JWT for creat a token that containe the inof of user ...
  }

  //leter
  //   async registerUser(input) {}
}
