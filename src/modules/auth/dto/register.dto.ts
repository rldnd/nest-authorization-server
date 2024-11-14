import { UserRole } from '@/common/@types/user';
import { USER_ROLES } from '@/common/constants/user';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

interface RegisterDTOProps {
  email: string;
  name: string;
  password: string;
  role: UserRole;
}

export class RegisterDTO implements RegisterDTOProps {
  @ApiProperty({ type: 'string', description: '사용자 이메일' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @ApiProperty({ type: 'string', description: '사용자 이름' })
  @IsString({ message: '사용자 이름은 문자열이어야 합니다.' })
  name: string;

  @ApiProperty({ type: 'string', description: '비밀번호' })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  password: string;

  @ApiProperty({ enum: USER_ROLES, description: '사용자 역할' })
  @IsEnum(USER_ROLES, { message: '사용자 역할이 올바르지 않습니다.' })
  role: UserRole;

  static of(dto: RegisterDTOProps) {
    return Object.assign(new RegisterDTO(), dto);
  }
}
