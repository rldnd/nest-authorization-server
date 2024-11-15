import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

interface CreateBaseAuthorityDomainDTOProps {
  name: string;
}

export class CreateBaseAuthorityDomainDTO implements CreateBaseAuthorityDomainDTOProps {
  @ApiProperty({ type: 'string', description: '기본 권한 도메인 이름' })
  @IsString()
  name: string;

  constructor(props?: CreateBaseAuthorityDomainDTOProps) {
    if (!props) return;
    this.name = props.name;
  }
}
