import { UserRole } from '@/common/@types/user';
import { userRoleNumberToString } from '@/modules/user/validation/user-role.validation';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndMerge<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!Array.isArray(roles) || roles.length === 0) return true;

    const user = context.switchToHttp().getRequest().user;
    const userRole = userRoleNumberToString(user.role);
    if (!userRole || !roles.includes(userRole)) {
      throw new ForbiddenException('조회할 수 없는 권한입니다.');
    }
    return true;
  }
}
