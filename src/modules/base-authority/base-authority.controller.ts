import { Auth } from '@/utils/decorator/auth.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseAuthorityService } from './base-authority.service';
import { BaseAuthorityDomainDTO } from './dto/base-authority-domain.dto';
import { BaseAuthorityDTO } from './dto/base-authority.dto';
import { CreateBaseAuthorityDomainDTO } from './dto/create-base-authority-domain.dto';

@Controller('base-authorities')
@ApiTags('기본 권한')
export class BaseAuthorityController {
  constructor(private readonly baseAuthorityService: BaseAuthorityService) {}

  @Get()
  @Auth()
  @ApiOperation({ description: '기본 권한 리스트 조회' })
  @ApiResponse({ status: 200, type: [BaseAuthorityDTO] })
  async findBaseAuthorities() {
    return await this.baseAuthorityService.findBaseAuthorities();
  }

  @Get('domains')
  @Auth()
  @ApiProperty({ description: '기본 권한 도메인 리스트 조회' })
  @ApiResponse({ status: 200, type: [BaseAuthorityDomainDTO] })
  async findBaseAuthorityDomains() {
    await this.baseAuthorityService.findBaseAuthorityDomains();
  }

  @Post('domains')
  @Auth('SUPER_ADMIN')
  @ApiOperation({ description: '기본 권한 도메인 생성' })
  @ApiResponse({ status: 201, type: BaseAuthorityDomainDTO })
  async createBaseAuthorityDomain(@Body() dto: CreateBaseAuthorityDomainDTO) {
    return await this.baseAuthorityService.createBaseAuthorityDomain(dto);
  }
}
