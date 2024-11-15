import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

interface LoginDTOProps {
  email: string;
  password: string;
}

export class LoginDTO implements LoginDTOProps {
  @ApiProperty({ type: 'string', description: '사용자 이메일' })
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;

  @ApiProperty({ type: 'string', description: '비밀번호' })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  password: string;

  constructor(props?: LoginDTOProps) {
    if (!props) return;
    this.email = props.email;
    this.password = props.password;
  }
}
