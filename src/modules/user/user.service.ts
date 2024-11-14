import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserException } from './exception/user.exception';
import { USER_ERROR_CODE } from './exception/error-code';
import { BaseUserDTO } from './dto/base-user.dto';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly database: PrismaService) {}

  async findMe(id: number) {
    const user = await this.database.user.findUnique({
      where: { id },
    });

    if (!user) throw new UserException(USER_ERROR_CODE.USER_NOT_FOUND);

    return new BaseUserDTO(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.database.user.findUnique({
      where: { email },
    });

    if (!user) throw new UserException(USER_ERROR_CODE.EMAIL_NOT_FOUND);

    return new UserDTO(user);
  }

  async createUser(createUserDTO: CreateUserDTO) {
    await this.checkDuplicatedEmail(createUserDTO.email);
    return await this.database.user.create({
      data: { ...createUserDTO },
    });
  }

  async checkDuplicatedEmail(email: string) {
    const user = await this.database.user.findUnique({
      where: { email },
    });

    if (user) throw new UserException(USER_ERROR_CODE.EMAIL_DUPLICATED);

    return true;
  }
}
