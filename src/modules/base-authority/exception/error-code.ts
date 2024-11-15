import { ErrorCodeMapper } from '@/common/@types/error';
import { HttpStatus } from '@nestjs/common';

export const BASE_AUTHORITY_ERROR_MESSAGE = {
  ALREADY_EXIST: '이미 존재합니다.',
};

export const BASE_AUTHORITY_ERROR_CODE: ErrorCodeMapper<typeof BASE_AUTHORITY_ERROR_MESSAGE> = {
  ALREADY_EXIST: { status: HttpStatus.CONFLICT, message: BASE_AUTHORITY_ERROR_MESSAGE.ALREADY_EXIST },
};
