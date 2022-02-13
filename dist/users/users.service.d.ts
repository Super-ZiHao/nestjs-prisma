import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createBookDto: CreateUserDto): import(".prisma/client").Prisma.Prisma__userClient<import(".prisma/client").user>;
    findAll(): import(".prisma/client").PrismaPromise<import(".prisma/client").user[]>;
    findOneID(id: string): import(".prisma/client").Prisma.Prisma__userClient<import(".prisma/client").user>;
    findOneUser(userName: string): import(".prisma/client").Prisma.Prisma__userClient<import(".prisma/client").user>;
    update(id: string, updateBookDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__userClient<import(".prisma/client").user>;
    remove(userName: string): import(".prisma/client").Prisma.Prisma__userClient<import(".prisma/client").user>;
}
