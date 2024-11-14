import { USER_ROLE_MAPPER, USER_ROLES } from '@/common/constants/user';
import { BaseValidator } from '@/utils/validation/base-validator';
import { IsEnum, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

enum UserRole {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
}

@ValidatorConstraint()
export class UserRoleConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    return value in UserRole;
  }
}

export const UserRoleValidation = BaseValidator(
  UserRoleConstraint,
  `UserRole은 ${USER_ROLES.join(', ')} 중 하나여야 합니다.`
);

export const userRoleNumberToString = (role: number) => {
  if (role === UserRole.USER) return USER_ROLE_MAPPER.USER;
  if (role === UserRole.ADMIN) return USER_ROLE_MAPPER.ADMIN;
  if (role === UserRole.SUPER_ADMIN) return USER_ROLE_MAPPER.SUPER_ADMIN;
  return false;
};

export const userRoleStringToNumber = (role: string) => {
  if (role === USER_ROLE_MAPPER.USER) return UserRole.USER;
  if (role === USER_ROLE_MAPPER.ADMIN) return UserRole.ADMIN;
  if (role === USER_ROLE_MAPPER.SUPER_ADMIN) return UserRole.SUPER_ADMIN;
  return false;
};

export const UserRoleResponseTransform = () => Transform(({ value }) => userRoleNumberToString(value));
export const UserRoleRequestTransform = () => Transform(({ value }) => userRoleStringToNumber(value));

export const UserRoleResponseDecorator = (nullable = false) =>
  applyDecorators(
    ApiProperty({ type: 'string', enum: USER_ROLES, nullable, example: USER_ROLES.join('|') }),
    IsEnum(USER_ROLES),
    UserRoleResponseTransform()
  );

export const UserRoleRequestDecorator = (nullable = false) =>
  applyDecorators(
    UserRoleRequestTransform(),
    IsEnum(Object.values(UserRole)),
    ApiProperty({ type: 'string', enum: USER_ROLES, nullable, example: USER_ROLES.join('|') }),
    UserRoleValidation()
  );
