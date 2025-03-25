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

@Controller('post')
export class PostController {
  data: CreatePostDTO[] = [
    {
      title: '첫 번째 게시물',
      content: '이것은 첫 번째 게시물의 내용 일부입니다...',
    },
    {
      title: '두 번째 게시물',
      content: '이것은 두 번째 게시물의 내용 일부입니다...',
    },
    {
      title: '세 번째 게시물',
      content: '이것은 세 번째 게시물의 내용 일부입니다...',
    },
  ];

  @Get()
  @ApiOperation({ summary: 'get posts' })
  sendPosts(): CreatePostDTO[] {
    return this.data;
  }

  @Get(':id')
  @ApiOperation({ summary: 'get a post' })
  sendPost(@Param('id') id: number): CreatePostDTO {
    return this.data[id - 1];
  }

  @Post()
  @ApiOperation({ summary: 'generate a post' })
  @ApiBody({ type: CreatePostDTO })
  createPost(@Body() body: CreatePostDTO): CreatePostDTO[] {
    this.data.push(body);
    return this.data;
  }

  @Put(':id')
  @ApiOperation({ summary: 'update a post' })
  @ApiParam({ name: 'id', description: 'id of the post' })
  @ApiBody({ type: CreatePostDTO })
  updatePost(
    @Param('id') id: number,
    @Body() body: CreatePostDTO,
  ): CreatePostDTO[] {
    this.data[id - 1] = body;
    return this.data;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a post' })
  @ApiParam({ name: 'id', description: 'id of the post' })
  delData(@Param('id') id: number): CreatePostDTO[] {
    this.data.splice(id - 1, 1);
    return this.data;
  }
}
