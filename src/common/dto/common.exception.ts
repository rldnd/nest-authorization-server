import { HttpException } from '@nestjs/common';
import type { BaseErrorCode } from '../@types/error';

export class CommonException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.status);
  }
}
