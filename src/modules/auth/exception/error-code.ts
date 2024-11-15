import { ErrorCodeMapper } from '@/common/@types/error';
import { HttpStatus } from '@nestjs/common';

export const AUTH_ERROR_MESSAGE = {
  PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  INVALID_TOKEN: 'INVALID_TOKEN',
  INVALID_REFRESH_TOKEN: 'INVALID_REFRESH_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
};

export const AUTH_ERROR_CODE: ErrorCodeMapper<typeof AUTH_ERROR_MESSAGE> = {
  PASSWORD_NOT_MATCH: {
    status: HttpStatus.BAD_REQUEST,
    message: AUTH_ERROR_MESSAGE.PASSWORD_NOT_MATCH,
  },
  INVALID_TOKEN: {
    status: HttpStatus.BAD_REQUEST,
    message: AUTH_ERROR_MESSAGE.INVALID_TOKEN,
  },
  INVALID_REFRESH_TOKEN: {
    status: HttpStatus.BAD_REQUEST,
    message: AUTH_ERROR_MESSAGE.INVALID_REFRESH_TOKEN,
  },
  TOKEN_EXPIRED: {
    status: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR_MESSAGE.TOKEN_EXPIRED,
  },
};
