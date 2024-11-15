import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import appConfig from './config/app.config';
import { GlobalModule } from './modules/global';
import { APIModule } from './modules';
import { Filters } from './utils/filter';

const providers: Provider[] = [...Filters];

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
  providers,
})
export class AppModule {}
