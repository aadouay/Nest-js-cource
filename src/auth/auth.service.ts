import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CheckInputValidation } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtservice: JwtService,
  ) {}

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

    const playlod = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtservice.signAsync(playlod);
    return {
      access_token: accessToken,
    };
  }

  //leter
  // async registerUser(input) {}
}
