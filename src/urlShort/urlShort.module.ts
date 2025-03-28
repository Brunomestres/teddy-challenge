import { Module } from '@nestjs/common';
import { UrlShortController } from './urlShort.controller';
import { UrlShortService } from './urlShort.service';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [UrlShortController],
  exports: [],
  imports: [],
  providers: [UrlShortService, PrismaService],
})
export class UrlShortModule {}
