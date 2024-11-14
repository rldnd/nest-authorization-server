import { ErrorCodeMapper } from '@/common/@types/error';
import { HttpStatus } from '@nestjs/common';

export const USER_ERROR_MESSAGE = {
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  EMAIL_NOT_FOUND: '존재하지 않는 사용자입니다.',
};

export const USER_ERROR_CODE: ErrorCodeMapper<typeof USER_ERROR_MESSAGE> = {
  USER_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: USER_ERROR_MESSAGE.USER_NOT_FOUND,
  },
  EMAIL_NOT_FOUND: {
    status: HttpStatus.BAD_REQUEST,
    message: USER_ERROR_MESSAGE.EMAIL_NOT_FOUND,
  },
};
