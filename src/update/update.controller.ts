import { Body, Controller, Get, Param, Put, Render } from '@nestjs/common';
import { CreatePostDTO } from 'src/post/DTO/createPost.dto';

@Controller('update')
export class UpdateController {
  data: object[] = [
    {
      id: 1,
      title: '첫 번째 게시물',
      content: '이것은 첫 번째 게시물의 내용 일부입니다...',
    },
    {
      id: 2,
      title: '두 번째 게시물',
      content: '이것은 두 번째 게시물의 내용 일부입니다...',
    },
    {
      id: 3,
      title: '세 번째 게시물',
      content: '이것은 세 번째 게시물의 내용 일부입니다...',
    },
  ];

  @Get(':id')
  @Render('update')
  renderPage() {}

  @Get(':id/post')
  sendPost(@Param('id') id: number) {
    return this.data[id - 1];
  }

  @Put(':id/update')
  updatePost(@Param('id') id: number, @Body() body: CreatePostDTO) {
    console.log(id, body);
    return body;
  }
}
