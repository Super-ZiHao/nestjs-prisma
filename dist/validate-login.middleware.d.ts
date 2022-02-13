import { NestMiddleware } from '@nestjs/common';
export declare class ValidateLoginMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void): void;
}
