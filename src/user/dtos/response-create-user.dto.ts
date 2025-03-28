import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateUser {
  @ApiProperty({ description: 'ID do usuário', example: '1' })
  id: number;
  @ApiProperty({ description: 'Email do usuário', example: 'example@mail.com' })
  email: string;
  @ApiProperty({ description: 'Nome do usuário', example: 'Shelley Dooley' })
  name: string;
}
