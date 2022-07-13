import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Redirect,
  UseFilters,
} from '@nestjs/common';
// import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
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
        url: 'http://www.google.com',
      };
    }
    return this.catsService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: number) {
    if (id > 100) {
      throw new NotFoundException();
    }
    return `Get by ${id}`;
  }
  @Post()
  // @Header('Cache-Control', 'none')
  // @UseFilters(HttpExceptionFilter)
  create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
    return this.catsService.create(createCatDto);
  }
}
