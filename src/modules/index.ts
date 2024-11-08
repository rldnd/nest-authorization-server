import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

export const Modules = [AuthModule, UserModule];

@Module({
  imports: Modules,
})
export class APIModule {}
