import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取输出
    const response = ctx.getResponse();
    // 获取请求
    const request = ctx.getRequest();
    // 获取状态码 ( 如果有状态码，则返回，没有状态码则返回一个服务器错误 )
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = exception.response.message;
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorMessage,
      data: {},
      OK: false,
    });
  }
}
