import appConfig from '@/config/app.config';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>) {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
