import appConfig from '@/config/app.config';
import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(appConfig.KEY) config: ConfigType<typeof appConfig>) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors()
    });
  }
}
