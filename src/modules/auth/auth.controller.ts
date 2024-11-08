import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: '로그인' })
  async login() {
    return this.authService.login();
  }

  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  async register() {
    return this.authService.register();
  }

  @Post('refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  async refresh() {
    return this.authService.refresh();
  }
}
