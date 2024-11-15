import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/passport/guards/jwt.guard';

export const Auth = () => applyDecorators(ApiBearerAuth('access-token'), UseGuards(JwtAuthGuard));
