import { ApiProperty } from '@nestjs/swagger';

export interface DateDTOProps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class DateDTO {
  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
  deletedAt: Date | null;

  static of(date: DateDTOProps): DateDTO {
    return {
      createdAt: date.createdAt,
      updatedAt: date.updatedAt,
      deletedAt: date.deletedAt || null,
    };
  }
}
