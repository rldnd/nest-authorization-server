import type { ErrorCodeVO } from '../vo/error-code.vo';

export type BaseErrorCode = ErrorCodeVO;

export type ErrorCodeMapper<T> = {
  [K in keyof T]: BaseErrorCode;
};
