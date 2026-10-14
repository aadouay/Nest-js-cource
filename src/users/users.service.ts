import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  // Get all users
  async getAll() {
    return await this.prismaService.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });
  }

  async findById(id: number) {
    const check_user = await this.prismaService.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
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
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });
    if (!check_user) return null;
    return check_user;
  }

  async createOne(body: CreateUserDto) {
    const check_user = await this.findByEmail(body.email);
    if (!check_user) {
      const pass_hashed = await bcrypt.hash(body.password, 10);
      const user = await this.prismaService.users.create({
        data: {
          first_name: body.firstname,
          last_name: body.lastname,
          email: body.email,
          phone: body.phone,
          password: pass_hashed,
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          phone: true,
        },
      });
      return user;
    }
    throw new ConflictException('This email is already registered.');
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const check_user = await this.findById(id);
    if (!check_user) throw new NotFoundException('User Not Found!');
    const update = await this.prismaService.users.update({
      where: { id },
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
      },
    });
    return update;
  }
}
