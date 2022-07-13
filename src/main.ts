import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局中间件
  // app.use(LoggerMiddleware);
  // 全局注册异常捕获方式2 方式1见app.module
  // const httpAdapter = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3000);
})();
