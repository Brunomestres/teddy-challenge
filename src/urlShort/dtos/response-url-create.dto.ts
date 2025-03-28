import { ApiProperty } from '@nestjs/swagger';

export class ResponseUpdateUrl {
  @ApiProperty({
    description: 'A URL encurtada',
    example: 'http://short.ly/abc123',
  })
  url: string;
}
