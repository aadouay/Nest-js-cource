import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // GET: ~/api/users
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getUniqueUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createOne(body);
  }
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteone(id);
  }
}
