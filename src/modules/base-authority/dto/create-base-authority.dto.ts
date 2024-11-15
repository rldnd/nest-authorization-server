import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

interface CreateBaseAuthorityDTOProps {
  name: string;
  description?: string;
  programCode?: string;
  domainId: number;
}

export class CreateBaseAuthorityDTO implements CreateBaseAuthorityDTOProps {
  @IsString()
  @ApiProperty({ type: 'string', description: '기본 권한 이름' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', description: '기본 권한 설명' })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', description: '프로그램 코드 (관련있는 페이지 path)' })
  programCode?: string;

  @IsNumber()
  @ApiProperty({ type: 'number', description: '도메인 ID' })
  domainId: number;

  constructor(props?: CreateBaseAuthorityDTOProps) {
    if (!props) return;
    this.name = props.name;
    this.description = props.description;
    this.programCode = props.programCode;
    this.domainId = props.domainId;
  }
}
