import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Redirect
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
// @Controller({host:'http://www.baidu.com'})
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  @Redirect('https://www.baidu.com', 302)
  findAll(@Query('version') version: string) {
    if (version) {
      return {
        url: 'http://www.google.com'
      };
    }
    return this.catsService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return `Get by ${id}`;
  }
  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
}
