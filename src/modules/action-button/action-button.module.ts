import { Module } from '@nestjs/common';
import { ActionButtonService } from './action-button.service';
import { ActionButtonController } from './action-button.controller';

@Module({
  controllers: [ActionButtonController],
  providers: [ActionButtonService],
})
export class ActionButtonModule {}
