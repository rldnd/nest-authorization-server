import appConfig from '@/config/app.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import type { LoginDTO } from './dto/login.dto';
import { AuthException } from './exception/auth.exception';
import { AUTH_ERROR_CODE } from './exception/error-code';
import { TokenPayloadProps } from '@/common/@types/jwt';
import { nanoid } from 'nanoid';
import { TokenDTO } from './dto/token.dto';
import { PrismaService } from '@/database/prisma.service';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly database: PrismaService
  ) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.validateLoginUser(loginDTO);
    const tokens = this.generateTokens({ id: user.id, role: user.role });
    await this.database.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken } });
    return tokens;
  }

  register(registerDTO: RegisterDTO) {
    return registerDTO;
  }

  refresh() {}

  private async validateLoginUser(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    const user = await this.userService.findUserByEmail(email);
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) throw new AuthException(AUTH_ERROR_CODE.PASSWORD_NOT_MATCH);
    return user;
  }

  private generateTokens<T extends TokenPayloadProps>(value: T, options?: JwtSignOptions) {
    const key = nanoid();

    const accessToken = this.jwtService.sign(
      { ...value },
      { ...options, expiresIn: this.config.JWT_ACCESS_TOKEN_EXPIRES_IN }
    );
    const refreshToken = this.jwtService.sign(
      { ...value, key },
      { ...options, expiresIn: this.config.JWT_REFRESH_TOKEN_EXPIRES_IN }
    );

    return TokenDTO.of({ accessToken, refreshToken });
  }
}
