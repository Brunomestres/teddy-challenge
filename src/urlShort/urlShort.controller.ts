import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  UseGuards,
  Request,
  Delete,
  Param,
  Put,
  Response,
} from '@nestjs/common';
import { UrlShortService } from './urlShort.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUrlDto } from './dtos/update-url.dto';
import { ShortUrlDto } from './dtos/short-url.dto';
import { ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { ResponseUpdateUrl } from './dtos/response-url-create.dto';
import { ResponseCreateUrl } from './dtos/response-url-update.dto';

@Controller()
export class UrlShortController {
  constructor(private readonly urlShortService: UrlShortService) {}

  @Post('/short')
  @ApiResponse({ status: 200, type: ResponseCreateUrl })
  urlShort(
    @Headers('Authorization') bearer: string,
    @Body() { url }: ShortUrlDto,
  ) {
    if (bearer) {
      return this.urlShortService.shortPersist(url, bearer.split(' ')[1]);
    } else {
      return this.urlShortService.short();
    }
  }

  @Get('/:short')
  async visiturl(@Response() res: any, @Param('short') url_short: string) {
    const url = await this.urlShortService.findOne(url_short);
    res.redirect(url);
  }

  @ApiSecurity('bearer')
  @Get('/url')
  @UseGuards(AuthGuard)
  get(@Request() req: any) {
    return this.urlShortService.list(req.user);
  }

  @ApiSecurity('bearer')
  @Delete('/url/:id')
  @UseGuards(AuthGuard)
  delete(@Request() req: any, @Param('id') id: string) {
    return this.urlShortService.deleted(id, req.user);
  }

  @ApiSecurity('bearer')
  @ApiResponse({ status: 200, type: ResponseUpdateUrl })
  @Put('/url/:id')
  @UseGuards(AuthGuard)
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() { url }: UpdateUrlDto,
  ) {
    return this.urlShortService.updateUrl(id, req.user, url);
  }
}
