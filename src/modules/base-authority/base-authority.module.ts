import { Module } from '@nestjs/common';
import { BaseAuthorityService } from './base-authority.service';
import { BaseAuthorityController } from './base-authority.controller';

@Module({
  controllers: [BaseAuthorityController],
  providers: [BaseAuthorityService],
})
export class BaseAuthorityModule {}
