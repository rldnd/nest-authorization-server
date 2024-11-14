import { ErrorCodeMapper } from '@/common/@types/error';
import { HttpStatus } from '@nestjs/common';

export const AUTH_ERROR_MESSAGE = {
  PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다.',
};

export const AUTH_ERROR_CODE: ErrorCodeMapper<typeof AUTH_ERROR_MESSAGE> = {
  PASSWORD_NOT_MATCH: {
    status: HttpStatus.BAD_REQUEST,
    message: AUTH_ERROR_MESSAGE.PASSWORD_NOT_MATCH,
  },
};
