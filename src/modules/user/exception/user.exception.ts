import type { BaseErrorCode } from '@/common/@types/error';
import { HttpException } from '@nestjs/common';

export class UserException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.status);
  }
}