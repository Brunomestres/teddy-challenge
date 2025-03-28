import { Injectable, ConflictException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDTO) {
    const isUserEmailExists = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (isUserEmailExists) {
      throw new ConflictException('Email já cadastrado');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const userCreated = await this.prisma.user.create({
      data: {
        email: data.email,
        password: passwordHash,
        name: data.name,
      },
      omit: { password: true, updatedAt: true, createdAt: true },
    });

    return userCreated;
  }
}
