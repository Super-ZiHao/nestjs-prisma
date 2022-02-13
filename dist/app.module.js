"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const books_module_1 = require("./books/books.module");
const prisma_service_1 = require("./prisma/prisma.service");
const validate_login_middleware_1 = require("./validate-login.middleware");
const users_module_1 = require("./users/users.module");
const users_service_1 = require("./users/users.service");
const path = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dayjs = require("dayjs");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(validate_login_middleware_1.ValidateLoginMiddleware).forRoutes(...['books']);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: path.join(__dirname, '../prisma/images/uploads'),
                    filename(req, file, cb) {
                        const date = dayjs().format('YYYY-MM-DD');
                        cb(null, `${date}-${file.originalname}`);
                    },
                }),
            }),
            books_module_1.BooksModule,
            users_module_1.UsersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService, users_service_1.UsersService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map