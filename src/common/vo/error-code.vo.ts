import type { HttpStatus } from '@nestjs/common';

export class ErrorCodeVO {
  readonly status: HttpStatus;
  readonly message: string;

  constructor(status: HttpStatus, message: string) {
    this.status = status;
    this.message = message;
  }
}
