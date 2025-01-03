import { TokenPayload } from '@/common/@types/jwt';
import { BaseUserDTO } from '@/modules/user/dto/base-user.dto';
import { UserService } from '@/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-custom';
import { PASSPORT_ERROR_CODE } from '../exception/error-code';
import { PassportException } from '../exception/passport.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
    super();
  }

  async validate(req: Request) {
    try {
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) throw new PassportException(PASSPORT_ERROR_CODE.INVALID_TOKEN);

      const payload = this.jwtService.verify(token) as TokenPayload;
      if (!('id' in payload) || !('role' in payload) || !('key' in payload))
        throw new PassportException(PASSPORT_ERROR_CODE.INVALID_TOKEN);

      const user = await this.userService.findUserById(payload.id);
      return new BaseUserDTO(user);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new PassportException(PASSPORT_ERROR_CODE.TOKEN_EXPIRED);
      }
      throw new PassportException(PASSPORT_ERROR_CODE.INVALID_TOKEN);
    }
  }
}
