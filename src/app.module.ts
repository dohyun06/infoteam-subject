import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [PostModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
