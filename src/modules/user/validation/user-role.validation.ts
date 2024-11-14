import { USER_ROLES } from '@/common/constants/user';
import { BaseValidator } from '@/utils/validation/base-validator';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

enum UserRole {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3,
}

// TODO: validation decorator
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

export const userRoleNumberToString = (role: number) => {};
