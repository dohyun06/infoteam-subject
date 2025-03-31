import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<CreateUserDTO[]> {
    return await this.prisma.user.findMany();
  }

  async registerUser(body: CreateUserDTO): Promise<CreateUserDTO> {
    return await this.prisma.user
      .create({
        data: {
          id: body.id,
          password: await bcrypt.hash(body.password, 10),
        },
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
          if (err.code === 'P2002')
            throw new ConflictException('This ID exists');

        throw new InternalServerErrorException();
      });
  }

  async getUser(id: string): Promise<CreateUserDTO> {
    return await this.prisma.user
      .findUnique({ where: { id: id } })
      .then((user) => {
        if (!user) throw new NotFoundException('ID is not found');
        return user;
      });
  }

  async changePassword(id: string, password: string) {
    return await this.prisma.user
      .update({
        where: { id: id },
        data: { password: await bcrypt.hash(password, 10) },
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
          if (err.code === 'P2025')
            throw new NotFoundException(`${id} is not found`);

        throw new InternalServerErrorException();
      });
  }

  async deleteUser(id: string) {
    return await this.prisma.user
      .delete({
        where: { id: id },
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
          if (err.code === 'P2025')
            throw new NotFoundException(`${id} is not found`);

        throw new InternalServerErrorException();
      });
  }
}
