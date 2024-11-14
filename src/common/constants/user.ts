export const USER_ROLE_MAPPER = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const USER_ROLES = Object.values(USER_ROLE_MAPPER);
