import { NestFactory } from '@nestjs/core';
import App from './app';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await new App(app).init();
}

bootstrap();
