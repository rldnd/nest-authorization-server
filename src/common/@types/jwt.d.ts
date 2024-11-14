import type { User } from '@prisma/client';
import type { UserRole } from './user';

export interface JwtPayload extends Pick<User, 'id'> {}

export interface TokenPayloadProps {
  id: number;
  role: UserRole;
}

export interface AccessTokenPayload extends TokenPayloadProps {}

export interface RefreshTokenPayload extends TokenPayloadProps {
  key: string;
}
