import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './modules/cats/cats.controller';
import { CatsModule } from './modules/cats/cats.module';
import { CatsService } from './modules/cats/cats.service';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [CatsModule, DatabaseModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService]
})
export class AppModule {}
