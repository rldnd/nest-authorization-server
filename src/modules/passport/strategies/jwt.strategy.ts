import { TokenPayload } from '@/common/@types/jwt';
import { Injectable } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { Strategy } from 'passport-custom';
import { PASSPORT_ERROR_CODE } from '../exception/error-code';
import { PassportException } from '../exception/passport.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async validate(req: Request) {
    try {
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) throw new PassportException(PASSPORT_ERROR_CODE.INVALID_TOKEN);

      const payload = this.jwtService.verify(token) as TokenPayload;
      if (!('id' in payload) || !('role' in payload) || !('key' in payload))
        throw new PassportException(PASSPORT_ERROR_CODE.INVALID_TOKEN);

      return payload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        throw new PassportException(PASSPORT_ERROR_CODE.TOKEN_EXPIRED);
      }
      throw new PassportException(PASSPORT_ERROR_CODE.INVALID_TOKEN);
    }
  }
}
