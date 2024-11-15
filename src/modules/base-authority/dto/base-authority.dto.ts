import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BaseAuthorityDomain } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseAuthorityDomainDTO } from './base-authority-domain.dto';

interface BaseAuthorityDTOProps {
  id: number;
  name: string;
  description: string | null;
  programCode: string | null;
  domain: BaseAuthorityDomain;
}

export class BaseAuthorityDTO implements BaseAuthorityDTOProps {
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'Base Authority ID' })
  id: number;

  @IsString()
  @ApiProperty({ type: 'string', description: '기본 권한 이름' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', description: '기본 권한 설명' })
  description: string | null;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', description: '프로그램 코드 (관련있는 페이지 path)' })
  programCode: string | null;

  @ApiProperty({ type: BaseAuthorityDomainDTO })
  domain: BaseAuthorityDomain;

  constructor(props: BaseAuthorityDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.programCode = props.programCode;
    this.domain = props.domain;
  }
}
