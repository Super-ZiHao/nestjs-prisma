import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.prismaService.book.create({
      data: createBookDto,
    });
  }

  // 查询所有
  findAll() {
    //findMany 查询所有 {where: {}} 查询条件空
    return this.prismaService.book.findMany({ where: {} });
  }

  // 查询单独
  findOne(id: string) {
    return this.prismaService.book.findUnique({
      where: {
        id,
      },
    });
  }

  // 更新
  update(id: string, updateBookDto: UpdateBookDto) {
    return this.prismaService.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  // 删除
  remove(id: string) {
    return this.prismaService.book.delete({ where: { id } });
  }
}
