import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsController } from './modules/cats/cats.controller';
import { CatsModule } from './modules/cats/cats.module';
import { CatsService } from './modules/cats/cats.service';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [CatsModule, DatabaseModule],
  controllers: [AppController, CatsController],
  // 全局注入异常捕获方式1  方式2见main.ts
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    AppService,
    CatsService,
  ],
})
export class AppModule implements NestModule {
  // 所有路由的中间件
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
  // 单个controller的中间件
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'cats', method: RequestMethod.POST })
      .forRoutes(CatsController);
  }
}
