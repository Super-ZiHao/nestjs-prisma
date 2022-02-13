import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PrismaService } from './prisma/prisma.service';
import { ValidateLoginMiddleware } from './validate-login.middleware';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';

@Module({
  imports: [
    // 文件上传处理
    MulterModule.register({
      storage: diskStorage({
        // 上传文件到哪个位置
        destination: path.join(__dirname, '../prisma/images/uploads'),
        filename(req, file, cb) {
          // 添加 Date 时间给文件上
          const date = dayjs().format('YYYY-MM-DD');
          cb(null, `${date}-${file.originalname}`);
        },
      }),
    }),
    BooksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule implements NestModule {
  //
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateLoginMiddleware).forRoutes(...['books']); // 指定使用登陆验证中间件的路由
  }
}
