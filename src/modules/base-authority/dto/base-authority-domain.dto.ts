import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

interface BaseAuthorityDomainDTOProps {
  id: number;
  name: string;
}

export class BaseAuthorityDomainDTO implements BaseAuthorityDomainDTOProps {
  @IsNumber()
  @ApiProperty({ type: 'number', description: 'ID' })
  id: number;

  @IsString()
  @ApiProperty({ type: 'string', description: '기본 권한 도메인 이름' })
  name: string;

  constructor(props: BaseAuthorityDomainDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
