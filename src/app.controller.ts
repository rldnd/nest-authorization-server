import { Controller, Get, Response } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response as ResponseType } from 'express';

@Controller()
@ApiTags('Health')
export class AppController {
  @Get('/health')
  @ApiOperation({ summary: '서버 Health Check API' })
  @ApiResponse({ status: 200, example: { status: 'HEALTHY' } })
  healthCheck(@Response() response: ResponseType) {
    response.status(200).json({ status: 'HEALTHY' });
  }

  @Get('')
  @ApiExcludeEndpoint()
  redirectSwagger(@Response() response: ResponseType) {
    response.redirect('/api-docs');
  }
}
