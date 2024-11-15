import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';

export const Jwt = () => applyDecorators(ApiBearerAuth('access-token'), UseGuards(JwtAuthGuard));
