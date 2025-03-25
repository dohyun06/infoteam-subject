import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDTO } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts(): Promise<CreatePostDTO[]> {
    return await this.prisma.post.findMany();
  }

  async getPost(id: number): Promise<CreatePostDTO> {
    return (
      await this.prisma.post.findMany({
        where: {
          id: id,
        },
      })
    )[0];
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
    return await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
  }

  async deletePost(id: number): Promise<CreatePostDTO> {
    return await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
}
