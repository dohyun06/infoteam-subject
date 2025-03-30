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
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'get posts' })
  @ApiOkResponse({ type: CreatePostDTO, description: 'Return posts' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async sendPosts(): Promise<CreatePostDTO[]> {
    return await this.postService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a post' })
  @ApiOkResponse({ type: CreatePostDTO, description: 'Return posts' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async sendPost(@Param('id') id: number): Promise<CreatePostDTO | null> {
    return await this.postService.getPost(id);
  }

  @Post()
  @ApiOperation({ summary: 'generate a post' })
  @ApiBody({ type: CreatePostDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createPost(@Body() body: CreatePostDTO): Promise<CreatePostDTO> {
    return await this.postService.makePost(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a post' })
  @ApiParam({ name: 'id', description: 'id of the post' })
  @ApiBody({ type: CreatePostDTO })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async updatePost(
    @Param('id') id: number,
    @Body() body: CreatePostDTO,
  ): Promise<CreatePostDTO> {
    return await this.postService.updatePost(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a post' })
  @ApiParam({ name: 'id', description: 'id of the post' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async asyncdelData(@Param('id') id: number): Promise<CreatePostDTO> {
    return await this.postService.deletePost(id);
  }
}
