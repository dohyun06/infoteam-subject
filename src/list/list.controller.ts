import { Controller, Get, Render } from '@nestjs/common';

@Controller('list')
export class ListController {
  @Get()
  @Render('list')
  renderPage() {}
}
