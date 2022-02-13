import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UnauthorizedException,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import * as dayjs from 'dayjs';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 登录
  @Post('login')
  async login(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const isUser = await this.userService.findOneUser(user.userName);
    if (!isUser) throw new UnauthorizedException(['该用户不存在']);
    if (isUser.passWord !== user.passWord)
      throw new UnauthorizedException(['密码错误']);
    // 登陆成功后给客户端添加 token
    response.cookie('token', '已登录', { httpOnly: true });
    return isUser;
  }

  // 注册
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    // 查询所有用户，判断是否注册重复
    const isUser = await this.userService.findOneUser(user.userName);
    console.log(isUser);
    if (isUser) throw new UnauthorizedException(['已存在该用户']);
    // 没问题则成功注册
    return this.userService.create(user);
  }

  // 单文件上传
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const date = dayjs().format('YYYY-MM-DD');
    return `http://localhost:3001/images/uploads/${date}-${file.originalname}`;
  }

  // 双文件上传
  @Post('uploads')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  uploadFiles(@UploadedFiles() files) {
    return [
      `http://localhost:3001/images/uploads/${files.avatar[0].originalname}`,
      `http://localhost:3001/images/uploads/${files.background[0].originalname}`,
    ];
  }
}
