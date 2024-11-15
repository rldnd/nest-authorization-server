import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { BaseUserDTO } from './dto/base-user.dto';
import { JwtAuthGuard } from '../passport/guards/jwt.guard';
import { Jwt } from '../passport/decorators/jwt.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me/:id')
  @ApiOperation({ summary: '본인 정보 조회' })
  @ApiResponse({ status: 200, type: BaseUserDTO })
  @Jwt()
  async findMe(@Param('id') id: number) {
    return await this.userService.findMe(id);
  }
}
