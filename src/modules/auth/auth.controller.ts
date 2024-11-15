import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { TokenDTO } from './dto/token.dto';
import { Response } from 'express';

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
  async register(@Res() res: Response, @Body() registerDTO: RegisterDTO) {
    await this.authService.register(registerDTO);
    return res.status(201).send();
  }

  @Post('refresh')
  @ApiOperation({ summary: '토큰 재발급' })
  @ApiResponse({ status: 200, type: TokenDTO })
  async refresh(@Body() tokenDTO: TokenDTO) {
    return this.authService.refresh(tokenDTO);
  }
}
