import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostModule } from './post/post.module';

import { UpdateModule } from './update/update.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [PostModule, UpdateModule, ListModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
