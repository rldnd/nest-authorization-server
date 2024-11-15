import type { User } from '@prisma/client';
import type { UserRole } from './user';

export interface JwtPayload extends Pick<User, 'id'> {}

export interface TokenPayloadProps {
  id: number;
  role: number;
}

export interface TokenPayload extends TokenPayloadProps {
  key: string;
}
