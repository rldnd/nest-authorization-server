import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me/:id')
  async findMe(@Param('id') id: number) {
    return await this.userService.findMe(id);
  }
}
