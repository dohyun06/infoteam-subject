import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PostModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
