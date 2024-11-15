import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { BaseAuthorityDomainDTO } from './dto/base-authority-domain.dto';
import { CreateBaseAuthorityDomainDTO } from './dto/create-base-authority-domain.dto';
import { BaseAuthorityException } from './exception/base-authority.exception';
import { BASE_AUTHORITY_ERROR_CODE } from './exception/error-code';

@Injectable()
export class BaseAuthorityService {
  constructor(private readonly database: PrismaService) {}

  async findBaseAuthorities() {
    const baseAuthorities = await this.database.baseAuthority.findMany({ include: { domain: true } });
  }

  async createBaseAuthority() {}

  async findBaseAuthorityDomains() {
    const baseAuthorityDomains = await this.database.baseAuthorityDomain.findMany();
    return baseAuthorityDomains.map((baseAuthorityDomain) => new BaseAuthorityDomainDTO(baseAuthorityDomain));
  }

  async createBaseAuthorityDomain(dto: CreateBaseAuthorityDomainDTO) {
    const existingBaseAuthorityDomain = await this.findBaseAuthorityDomainByName(dto.name);

    if (!!existingBaseAuthorityDomain) throw new BaseAuthorityException(BASE_AUTHORITY_ERROR_CODE.ALREADY_EXIST);
    const baseAuthorityDomain = await this.database.baseAuthorityDomain.create({ data: dto });
    return new BaseAuthorityDomainDTO(baseAuthorityDomain);
  }

  private async findBaseAuthorityDomainByName(name: string) {
    return await this.database.baseAuthorityDomain.findUnique({ where: { name } });
  }
}
