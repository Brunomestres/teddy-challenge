import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateUrlDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
