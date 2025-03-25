import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getProjects(): Promise<ProjectDto[]> {
    return await this.prisma.project.findMany();
  }

  async getProject(data: { id: string }): Promise<ProjectDto[]> {
    const title: string = data.id;
    return await this.prisma.project.findMany({
      where: { title: title },
      select: {
        title: true,
        detail: true,
        tags: true,
      },
    });
  }
}
