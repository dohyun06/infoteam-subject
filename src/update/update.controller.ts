import { Body, Controller, Get, Param, Put, Render } from '@nestjs/common';
import { CreatePostDTO } from 'src/post/DTO/createPost.dto';

@Controller('update')
export class UpdateController {
  @Get(':id')
  @Render('update')
  renderPage() {}

  @Get(':id/post')
  sendPost(@Param('id') id: number) {
    return JSON.stringify({
      id: id,
      title: 'this is title about post',
      content:
        'ths is content about content, and i dont know what i write here',
    });
  }

  @Put(':id/update')
  updatePost(@Param('id') id: number, @Body() body: CreatePostDTO) {
    console.log(id, body);
    return body;
  }
}
