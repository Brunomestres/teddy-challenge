import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { jwtConstants } from 'src/auth/constants';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UrlShortService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  short() {
    const urlShort = this.transformUrl();
    return { url: urlShort };
  }

  async shortPersist(url: string, token: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const user = this.jwtService.decode<{ userId: number; email: string }>(
        token,
      );
      const urlCreated = await this.prisma.url.create({
        data: {
          original_url: url,
          short_url: nanoid(6),
          userId: user.userId,
          click: 0,
        },
      });
      return { url: `${process.env.BASE_URL}/${urlCreated.short_url}` };
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async list(user: any) {
    try {
      console.log(user);
      const res = await this.prisma.url.findMany({
        where: { userId: user.userId, AND: { deleted: false } },
      });

      return res;
    } catch (err: any) {
      console.log(err);

      throw new InternalServerErrorException();
    }
  }

  transformUrl(): string {
    return `${process.env.BASE_URL}/${nanoid(6)}`;
  }

  async deleted(id: string, user: any) {
    const url = await this.prisma.url.findFirst({
      where: { id: Number(id), AND: { userId: user.userId } },
    });

    if (!url) {
      throw new NotFoundException();
    }

    await this.prisma.url.update({
      where: { id: url.id },
      data: {
        deleted: true,
      },
    });

    return { message: 'Url removida com sucesso' };
  }

  async findOne(short_url: string) {
    const url = await this.prisma.url.findFirst({ where: { short_url } });

    if (!url) {
      throw new NotFoundException();
    }

    await this.prisma.url.update({
      where: { id: url.id },
      data: { click: { increment: 1 } },
    });

    return url.original_url;
  }

  async updateUrl(id: string, user: any, original_url: string) {
    const url = await this.prisma.url.findFirst({
      where: { id: Number(id), AND: { userId: user.userId } },
    });

    if (!url) {
      throw new NotFoundException();
    }

    const urlAtt = await this.prisma.url.update({
      where: { id: url.id },
      data: {
        original_url,
      },
    });

    return { url: `${process.env.BASE_URL}/${urlAtt.short_url}` };
  }
}
