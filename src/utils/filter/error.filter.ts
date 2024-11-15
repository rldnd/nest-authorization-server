import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errRes = exception['getResponse'] ? exception.getResponse() : null;

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      errRes?.message && Array.isArray(errRes.message) && errRes.message.length > 0
        ? errRes.message
        : exception.message || 'Internal Server Error';

    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
