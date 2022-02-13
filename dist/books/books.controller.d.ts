import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): import(".prisma/client").Prisma.Prisma__bookClient<import(".prisma/client").book>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").book[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__bookClient<import(".prisma/client").book>;
    update(id: string, updateBookDto: UpdateBookDto): import(".prisma/client").Prisma.Prisma__bookClient<import(".prisma/client").book>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__bookClient<import(".prisma/client").book>;
}
