import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDTO } from './dto/createPost.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'get posts' })
  async sendPosts(): Promise<CreatePostDTO[]> {
    return await this.postService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a post' })
  async sendPost(@Param('id') id: number): Promise<CreatePostDTO> {
    return await this.postService.getPost(id);
  }

  @Post()
  @ApiOperation({ summary: 'generate a post' })
  @ApiBody({ type: CreatePostDTO })
  async createPost(@Body() body: CreatePostDTO): Promise<CreatePostDTO> {
    return await this.postService.makePost(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a post' })
  @ApiParam({ name: 'id', description: 'id of the post' })
  @ApiBody({ type: CreatePostDTO })
  async updatePost(
    @Param('id') id: number,
    @Body() body: CreatePostDTO,
  ): Promise<CreatePostDTO> {
    return await this.postService.updatePost(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a post' })
  @ApiParam({ name: 'id', description: 'id of the post' })
  async asyncdelData(@Param('id') id: number): Promise<CreatePostDTO> {
    return await this.postService.deletePost(id);
  }
}
