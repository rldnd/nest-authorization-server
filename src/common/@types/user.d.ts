import { USER_ROLE_MAPPER } from '../constants/user';

export type UserRole = (typeof USER_ROLE_MAPPER)[keyof typeof USER_ROLE_MAPPER];
