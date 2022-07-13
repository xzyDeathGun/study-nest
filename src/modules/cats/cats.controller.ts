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
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import {
  JoiValidationPipe,
  ValidationPipe,
} from '../../common/pipes/customValidation.pipe';
// import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
// import { createCatSchema } from './schema/create-cat.schema';

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
  findById(@Param('id', ParseIntPipe) id: number) {
    if (id > 100) {
      throw new NotFoundException();
    }
    return `Get by ${id}`;
  }
  @Post()
  // @Header('Cache-Control', 'none')
  // @UseFilters(HttpExceptionFilter)
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    // throw new ForbiddenException();
    return this.catsService.create(createCatDto);
  }
}
