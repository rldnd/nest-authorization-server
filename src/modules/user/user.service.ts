import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserException } from './exception/user.exception';
import { USER_ERROR_CODE } from './exception/error-code';

@Injectable()
export class UserService {
  constructor(private readonly database: PrismaService) {}

  async findMe(id: number) {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) throw new UserException(USER_ERROR_CODE.USER_NOT_FOUND);

    return user;
  }
}
