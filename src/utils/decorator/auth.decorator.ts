import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/passport/guards/jwt.guard';
import type { UserRole } from '@/common/@types/user';
import { Roles } from './role.decorator';
import { RolesGuard } from '../guards/role.guard';

export const Auth = (...roles: UserRole[]) =>
  applyDecorators(ApiBearerAuth('access-token'), UseGuards(JwtAuthGuard), Roles(...roles), UseGuards(RolesGuard));
