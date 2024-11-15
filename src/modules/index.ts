import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ActionButtonModule } from './action-button/action-button.module';
import { AuthorityModule } from './authority/authority.module';
import { BaseAuthorityModule } from './base-authority/base-authority.module';

export const Modules = [AuthModule, UserModule, ActionButtonModule, AuthorityModule, BaseAuthorityModule];

@Module({
  imports: Modules,
})
export class APIModule {}
