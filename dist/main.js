"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const all_response_interceptor_1 = require("./all-response.interceptor");
const any_exception_filter_1 = require("./any-exception.filter");
const app_module_1 = require("./app.module");
const serveStatic = require("serve-static");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: true, credentials: true });
    app.use('/images', serveStatic((0, path_1.join)(__dirname, '../prisma/images'), {
        maxAge: '1d',
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
    }));
    app.useGlobalInterceptors(new all_response_interceptor_1.AllResponseInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new any_exception_filter_1.AnyExceptionFilter());
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('我的Api文档')
        .setDescription('本文档所有API介于此！！！')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map