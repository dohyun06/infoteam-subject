import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { CreatePostDTO } from './DTO/createPost.dto';

@Controller('post')
export class PostController {
  @Get()
  @Render('post')
  renderPage() {}

  @Post('post')
  createPost(@Body() body: CreatePostDTO) {
    console.log(body);
    return body;
  }
}
