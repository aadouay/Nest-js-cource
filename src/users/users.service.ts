import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // Get all users
  async getAll() {
    return await this.prismaService.users.findMany();
  }

  async findById(id: number) {
    const check_user = await this.prismaService.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!check_user) return null;
    return check_user;
  }

  async findByEmail(body: string) {
    const check_user = await this.prismaService.users.findUnique({
      where: {
        email: body,
      },
    });
    if (!check_user) return null;
    return check_user;
  }

  async createOne(body: CreateUserDto) {
    const check_user = await this.findByEmail(body.email);
    if (!check_user) {
      const user = await this.prismaService.users.create({
        data: {
          first_name: body.firstname,
          last_name: body.lastname,
          email: body.email,
          phone: body.phone,
          password: body.password,
        },
      });
      return user;
    }
    throw new ConflictException('This email is already registered.');
  }
  
  async updateUser(id: number, body: UpdateUserDto) {}
}
