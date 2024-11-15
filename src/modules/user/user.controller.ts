import { Auth } from '@/utils/decorator/auth.decorator';
import { ReqUser } from '@/utils/decorator/req-user.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseUserDTO } from './dto/base-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: '본인 정보 조회' })
  @ApiResponse({ status: 200, type: BaseUserDTO })
  @Auth()
  async findMe(@ReqUser() user: BaseUserDTO) {
    return user;
  }
}
