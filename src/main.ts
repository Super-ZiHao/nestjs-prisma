import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AllResponseInterceptor } from './all-response.interceptor';
import { AnyExceptionFilter } from './any-exception.filter';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 跨域 and 传递 cookie
  app.enableCors({ origin: true, credentials: true });

  // 静态目录配置
  app.use(
    '/images',
    serveStatic(join(__dirname, '../prisma/images'), {
      maxAge: '1d',
      extensions: ['jpg', 'jpeg', 'png', 'gif'],
    }),
  );

  // 使用自定义的全局拦截器对返回数据做处理
  app.useGlobalInterceptors(new AllResponseInterceptor());

  // 使用验证
  app.useGlobalPipes(new ValidationPipe());

  // 对服务器的异常统一处理
  app.useGlobalFilters(new AnyExceptionFilter());

  // 使用 cookie 格式化插件
  app.use(cookieParser());
  /**
   * setTitle —— 文档标题
   * setDescription —— 文档简介
   * setVersion —— 版本气泡
   * addTag ——
   */
  const config = new DocumentBuilder()
    .setTitle('我的Api文档')
    .setDescription('本文档所有API介于此！！！')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 文档地址 /api

  // 启动服务器端口号
  await app.listen(3001);
}
bootstrap();
