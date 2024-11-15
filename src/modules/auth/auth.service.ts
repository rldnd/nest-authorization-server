import { TokenPayload, TokenPayloadProps } from '@/common/@types/jwt';
import appConfig from '@/config/app.config';
import { PrismaService } from '@/database/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService, JwtSignOptions, TokenExpiredError } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { UserService } from '../user/user.service';
import type { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { TokenDTO } from './dto/token.dto';
import { AuthException } from './exception/auth.exception';
import { AUTH_ERROR_CODE } from './exception/error-code';

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

  async register(registerDTO: RegisterDTO) {
    const salt = bcrypt.genSaltSync(this.config.SALT_ROUND);
    const password = bcrypt.hashSync(registerDTO.password, salt);
    await this.userService.createUser({ ...registerDTO, salt, password });
  }

  async refresh(tokenDTO: TokenDTO) {
    this.checkTokenExpired(tokenDTO.refreshToken);
    this.checkTokensPayloadMatched(tokenDTO);
    await this.checkRefreshTokenWithUserMatched(tokenDTO);

    const { accessPayload } = this.getTokensPayload(tokenDTO);
    const user = await this.userService.findUserById(accessPayload.id);
    const tokens = this.generateTokens({ id: user.id, role: user.role });
    await this.database.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken } });
    return tokens;
  }

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
      { ...value, key },
      { ...options, expiresIn: this.config.JWT_ACCESS_TOKEN_EXPIRES_IN }
    );
    const refreshToken = this.jwtService.sign(
      { ...value, key },
      { ...options, expiresIn: this.config.JWT_REFRESH_TOKEN_EXPIRES_IN }
    );

    return new TokenDTO({ accessToken, refreshToken });
  }

  private checkTokenExpired(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (err) {
      if (err instanceof TokenExpiredError) throw new AuthException(AUTH_ERROR_CODE.TOKEN_EXPIRED);
      else throw new AuthException(AUTH_ERROR_CODE.INVALID_TOKEN);
    }
  }

  private getTokensPayload(tokenDTO: TokenDTO) {
    const accessPayload = this.jwtService.verify(tokenDTO.accessToken, { ignoreExpiration: true }) as TokenPayload;
    const refreshPayload = this.jwtService.verify(tokenDTO.refreshToken);

    return { accessPayload, refreshPayload };
  }

  private async checkTokensPayloadMatched(tokenDTO: TokenDTO) {
    const { accessPayload, refreshPayload } = this.getTokensPayload(tokenDTO);
    if (!accessPayload || !refreshPayload) throw new AuthException(AUTH_ERROR_CODE.INVALID_TOKEN);
    if (accessPayload.id !== refreshPayload.id) throw new AuthException(AUTH_ERROR_CODE.INVALID_TOKEN);
    if (accessPayload.key !== refreshPayload.key) throw new AuthException(AUTH_ERROR_CODE.INVALID_TOKEN);
  }

  private async checkRefreshTokenWithUserMatched(tokenDTO: TokenDTO) {
    const { refreshPayload } = this.getTokensPayload(tokenDTO);
    const user = await this.userService.findUserById(refreshPayload.id);
    if (user.refreshToken !== tokenDTO.refreshToken) throw new AuthException(AUTH_ERROR_CODE.INVALID_REFRESH_TOKEN);
  }
}
