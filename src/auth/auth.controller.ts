import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckInputValidation } from './dtos/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('login')
  async logIn(@Body() input: CheckInputValidation) {
    return this.authservice.logIn(input);
  }
}
