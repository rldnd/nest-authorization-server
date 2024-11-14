import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { UserRoleRequestDecorator } from '../validation/user-role.validation';

interface UserDTOProps {
  id: number;
  email: string;
  name: string;
  password: string;
  salt: string;
  role: number;
  refreshToken: string | null;
}

export class UserDTO implements UserDTOProps {
  @ApiProperty({ type: 'number', description: '사용자 ID' })
  @IsNumber({}, { message: '숫자가 아닙니다.' })
  id: number;

  @ApiProperty({ type: 'string', description: '사용자 이름' })
  @IsString({ message: '문자열이 아닙니다.' })
  name: string;

  @ApiProperty({ type: 'string', description: '사용자 이메일' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @ApiProperty({ type: 'string', description: '사용자 비밀번호' })
  @IsString({ message: '문자열이 아닙니다.' })
  password: string;

  @ApiProperty({ type: 'string', description: 'salt' })
  @IsString({ message: '문자열이 아닙니다.' })
  salt: string;

  @UserRoleRequestDecorator()
  role: number;

  @ApiProperty({ type: 'string', description: '리프레시 토큰' })
  refreshToken: string | null;

  constructor(props: UserDTOProps) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.salt = props.salt;
    this.role = props.role;
    this.refreshToken = props.refreshToken;
  }
}
