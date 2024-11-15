import { PrismaModule } from '@/database/prisma.module';
import { Global, Module } from '@nestjs/common';
import { PassportModule } from './passport/passport.module';

@Global()
@Module({
  imports: [PrismaModule, PassportModule],
  exports: [PrismaModule, PassportModule],
})
export class GlobalModule {}
