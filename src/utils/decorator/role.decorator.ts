import type { UserRole } from '@/common/@types/user';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = Symbol('roles');

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
