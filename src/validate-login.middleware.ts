import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  /**
   * req 请求
   * res 响应
   * next 下一个
   */
  use(req: any, res: any, next: () => void) {
    // 判断请求有无携带 token ( token代表是否登录 )
    if (req.cookies.token) {
      next();
    } else {
      // cookie 中没有 token 的时候抛出异常
      throw new UnauthorizedException(['还未登陆']);
    }
  }
}
