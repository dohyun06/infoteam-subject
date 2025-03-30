import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDTO } from './dto/createPost.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts(): Promise<CreatePostDTO[]> {
    return await this.prisma.post.findMany();
  }

  async getPost(id: number): Promise<CreatePostDTO | null> {
    return await this.prisma.post
      .findUnique({
        where: {
          id: id,
        },
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
          if (err.code === 'P2025')
            throw new NotFoundException(`${id} is not found`);

        throw new InternalServerErrorException();
      });
  }

  async makePost(body: CreatePostDTO): Promise<CreatePostDTO> {
    return await this.prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
      },
    });
  }

  async updatePost(id: number, body: CreatePostDTO): Promise<CreatePostDTO> {
    return await this.prisma.post
      .update({
        where: {
          id: id,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
          if (err.code === 'P2025')
            throw new NotFoundException(`${id} is not found`);

        throw new InternalServerErrorException();
      });
  }

  async deletePost(id: number): Promise<CreatePostDTO> {
    return await this.prisma.post
      .delete({
        where: {
          id: id,
        },
      })
      .catch((err) => {
        if (err instanceof Prisma.PrismaClientKnownRequestError)
          if (err.code === 'P2025')
            throw new NotFoundException(`${id} is not found`);

        throw new InternalServerErrorException();
      });
  }
}
