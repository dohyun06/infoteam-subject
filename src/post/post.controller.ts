import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
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
import { HttpExceptionFilter } from 'filter/http-exception.filter';
import { CreatePostParamDTO } from './dto/createPostParam.dto';
import { GetPostDTO } from './dto/getPost.dto';

@Controller('post')
@UseFilters(new HttpExceptionFilter())
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'get posts' })
  @ApiOkResponse({ type: CreatePostDTO, description: 'Return posts' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async sendPosts(): Promise<GetPostDTO[]> {
    return await this.postService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a post' })
  @ApiOkResponse({ type: CreatePostDTO, description: 'Return posts' })
  @ApiParam({
    name: 'id',
    description: 'ID of the post',
    type: Number,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async sendPost(@Param() { id }: CreatePostParamDTO): Promise<GetPostDTO> {
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
  @ApiParam({
    name: 'id',
    description: 'ID of the post',
    type: Number,
  })
  @ApiBody({ type: CreatePostDTO })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async updatePost(
    @Param() { id }: CreatePostParamDTO,
    @Body() body: CreatePostDTO,
  ): Promise<CreatePostDTO> {
    return await this.postService.updatePost(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a post' })
  @ApiParam({
    name: 'id',
    description: 'id of the post',
    type: Number,
  })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async asyncdelData(
    @Param() { id }: CreatePostParamDTO,
  ): Promise<CreatePostDTO> {
    return await this.postService.deletePost(id);
  }
}
