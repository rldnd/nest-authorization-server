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

  static of(dto: TokenDTOProps): TokenDTO {
    return Object.assign(new TokenDTO(), dto);
  }
}
