import { IsNotEmpty, IsString } from 'class-validator';
export class ShortUrlDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
