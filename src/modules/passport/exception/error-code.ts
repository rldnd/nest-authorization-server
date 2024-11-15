import { ErrorCodeMapper } from '@/common/@types/error';
import { HttpStatus } from '@nestjs/common';

export const PASSPORT_ERROR_MESSAGE = {
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
};

export const PASSPORT_ERROR_CODE: ErrorCodeMapper<typeof PASSPORT_ERROR_MESSAGE> = {
  INVALID_TOKEN: {
    status: HttpStatus.UNAUTHORIZED,
    message: PASSPORT_ERROR_MESSAGE.INVALID_TOKEN,
  },
  TOKEN_EXPIRED: {
    status: HttpStatus.UNAUTHORIZED,
    message: PASSPORT_ERROR_MESSAGE.TOKEN_EXPIRED,
  },
};
