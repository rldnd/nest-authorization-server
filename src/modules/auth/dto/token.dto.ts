import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString } from 'class-validator';

export interface TokenDTOProps {
  accessToken: string;
  refreshToken: string;
}

export class TokenDTO implements TokenDTOProps {
  @ApiProperty({ type: 'string' })
  @IsJWT({ message: 'Not Valid JWT Token' })
  accessToken: string;

  @ApiProperty({ type: 'string' })
  @IsJWT({ message: 'Not Valid JWT Token' })
  refreshToken: string;

  constructor(props: TokenDTOProps) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}
