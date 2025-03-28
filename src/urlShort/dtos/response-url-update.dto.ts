import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateUrl {
  @ApiProperty({
    description: 'A URL encurtada',
    example: 'http://short.ly/abc123',
  })
  url: string;
}
