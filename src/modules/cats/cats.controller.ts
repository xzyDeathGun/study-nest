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
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { first } from 'rxjs';
import { Auth } from '../../common/decorators/auth.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { User } from '../../common/decorators/user.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
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
// @UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  // @Redirect('https://www.baidu.com', 302)
  findAll(@Query('version') version: string) {
    // if (version) {
    //   return {
    //     url: 'http://www.google.com',
    //   };
    // }
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
  @Auth('admin')
  create(@User(new ValidationPipe()) user: any) {
    console.log(`Hello ${user}`);
  }
  // create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  //   // throw new ForbiddenException();
  //   return this.catsService.create(createCatDto);
  // }
}
