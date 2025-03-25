import { Controller, Delete, Get, Param, Render } from '@nestjs/common';

@Controller('list')
export class ListController {
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

  @Get()
  @Render('list')
  renderPage() {}

  @Get('data')
  sendData() {
    return this.data;
  }

  @Delete('delete/:id')
  delData(@Param('id') id: number) {
    console.log(id);
    this.data.splice(id - 1, 1);
    console.log(this.data);
    return this.data;
  }
}
