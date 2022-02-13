import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class AnyExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
