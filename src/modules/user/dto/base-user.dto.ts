import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleResponseDecorator } from '../validation/user-role.validation';

interface BaseUserDTOProps
  extends Omit<User, 'password' | 'salt' | 'positionId' | 'responsibilityOfOfficeId' | 'jobId' | 'refreshToken'> {}

/** 다른 유저를 조회하는 데에 사용하는 DTO */
export class BaseUserDTO implements BaseUserDTOProps {
  @ApiProperty({ type: 'number', description: '사용자 ID' })
  id: number;

  @ApiProperty({ type: 'string', description: '사용자 이름' })
  name: string;

  @ApiProperty({ type: 'string', description: '사용자 이메일' })
  email: string;

  @UserRoleResponseDecorator()
  role: number;

  constructor(dto: BaseUserDTOProps) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
    this.role = dto.role;
  }
}
