import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

interface BaseUser
  extends Omit<User, 'password' | 'salt' | 'positionId' | 'responsibilityOfOfficeId' | 'jobId' | 'refreshToken'> {}

/** 다른 유저를 조회하는 데에 사용하는 DTO */
export class BaseUserDTO implements BaseUser {
  @ApiProperty({ type: 'number', description: '사용자 ID' })
  id: number;

  @ApiProperty({ type: 'string', description: '사용자 이름' })
  name: string;

  @ApiProperty({ type: 'string', description: '사용자 이메일' })
  email: string;

  @ApiProperty({ type: 'number', description: '사용자 권한' })
  role: number;

  static of(user: BaseUser): BaseUserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  static fromUser(user: User): BaseUserDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
