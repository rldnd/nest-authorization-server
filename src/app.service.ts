import { Injectable } from '@nestjs/common';
import { Position } from '@prisma/client';
import { PrismaService } from './database/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): Promise<Position[]> {
    return this.prisma.position.findMany();
  }
}
