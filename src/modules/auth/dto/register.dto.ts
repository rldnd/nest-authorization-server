import { UserRole } from '@/common/@types/user';
import { USER_ROLES } from '@/common/constants/user';
import { UserRoleRequestDecorator } from '@/modules/user/validation/user-role.validation';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

interface RegisterDTOProps {
  email: string;
  name: string;
  password: string;
  role: number;
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

  @UserRoleRequestDecorator()
  role: number;

  constructor(props: RegisterDTOProps) {
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.role = props.role;
  }
}
