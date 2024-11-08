import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import appConfig from './config/app.config';
import { GlobalModule } from './modules/global';
import { APIModule } from './modules';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig],
    }),
    APIModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
