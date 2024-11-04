import { NestFactory, Reflector } from '@nestjs/core';
import App from './app';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await new App(app)
    .configureMiddleware()
    .configureInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .configurePipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: true,
      })
    )
    .init();
}

bootstrap();
