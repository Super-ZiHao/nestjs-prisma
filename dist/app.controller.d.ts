/// <reference types="multer" />
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
export declare class AppController {
    private readonly appService;
    private readonly userService;
    constructor(appService: AppService, userService: UsersService);
    getHello(): string;
    login(user: CreateUserDto, response: Response): Promise<import(".prisma/client").user>;
    register(user: CreateUserDto): Promise<import(".prisma/client").user>;
    uploadFile(file: Express.Multer.File): string;
    uploadFiles(files: any): string[];
}
