import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { BaseUserDTO } from './dto/base-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me/:id')
  @ApiOperation({ summary: '본인 정보 조회' })
  @ApiResponse({ status: 200, type: BaseUserDTO })
  async findMe(@Param('id') id: number) {
    return await this.userService.findMe(id);
  }
}
