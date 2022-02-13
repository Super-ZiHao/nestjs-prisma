import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBookDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createBookDto,
    });
  }

  // 查询所有
  findAll() {
    //findMany 查询所有 {where: {}} 查询条件空
    return this.prismaService.user.findMany({ where: {} });
  }

  // 查询单独 ID
  findOneID(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  // 查询单独 用户
  findOneUser(userName: string) {
    return this.prismaService.user.findUnique({
      where: {
        userName,
      },
    });
  }

  // 更新
  update(id: string, updateBookDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateBookDto,
    });
  }

  // 删除
  remove(userName: string) {
    return this.prismaService.user.delete({ where: { userName } });
  }
}
