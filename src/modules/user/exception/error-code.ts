import { ErrorCodeMapper } from '@/common/@types/error';
import { HttpStatus } from '@nestjs/common';

export const USER_ERROR_MESSAGE = {
  USER_NOT_FOUND: '유저를 찾을 수 없습니다.',
};

export const USER_ERROR_CODE: ErrorCodeMapper<typeof USER_ERROR_MESSAGE> = {
  USER_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    message: USER_ERROR_MESSAGE.USER_NOT_FOUND,
  },
};
