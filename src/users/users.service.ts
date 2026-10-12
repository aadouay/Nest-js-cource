import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

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
    try {
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
    } catch (error) {
      if (error === 'P2002')
        throw new ConflictException('This email is already registered.');
      else if (error === 'P2011')
        throw new BadRequestException('You missed a field that is required. !');
      else if (error === 'P2000') throw new BadRequestException();
      else throw new InternalServerErrorException('Could not create user.');
    }
  }
}
