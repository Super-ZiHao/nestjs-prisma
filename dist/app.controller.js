"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("./app.service");
const create_user_dto_1 = require("./users/dto/create-user.dto");
const users_service_1 = require("./users/users.service");
const dayjs = require("dayjs");
let AppController = class AppController {
    constructor(appService, userService) {
        this.appService = appService;
        this.userService = userService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async login(user, response) {
        const isUser = await this.userService.findOneUser(user.userName);
        if (!isUser)
            throw new common_1.UnauthorizedException(['该用户不存在']);
        if (isUser.passWord !== user.passWord)
            throw new common_1.UnauthorizedException(['密码错误']);
        response.cookie('token', '已登录', { httpOnly: true });
        return isUser;
    }
    async register(user) {
        const isUser = await this.userService.findOneUser(user.userName);
        console.log(isUser);
        if (isUser)
            throw new common_1.UnauthorizedException(['已存在该用户']);
        return this.userService.create(user);
    }
    uploadFile(file) {
        const date = dayjs().format('YYYY-MM-DD');
        return `http://localhost:3001/images/uploads/${date}-${file.originalname}`;
    }
    uploadFiles(files) {
        return [
            `http://localhost:3001/images/uploads/${files.avatar[0].originalname}`,
            `http://localhost:3001/images/uploads/${files.background[0].originalname}`,
        ];
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('uploads'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'avatar', maxCount: 1 },
        { name: 'background', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFiles", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        users_service_1.UsersService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map