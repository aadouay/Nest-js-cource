import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInfo } from './dtos/Users-info.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}
  // GET: ~/api/users
  @Get()
  getAllUsers() {
    return this.UsersService.getAll();
  }

  @Get(':id')
  async getUniqueUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.UsersService.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Get()
  async getUserByEmail(@Body() body: UserInfo) {
    const user = await this.UsersService.findByEmail(body.email);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.UsersService.createOne(body);
  }
}
