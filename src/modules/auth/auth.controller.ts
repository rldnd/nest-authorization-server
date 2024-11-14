import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 200, type: TokenDTO })
  @ApiOperation({ summary: '로그인' })
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @Post('register')
  @ApiBody({ type: RegisterDTO })
  @ApiOperation({ summary: '회원가입' })
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  async refresh() {
    return this.authService.refresh();
  }
}
