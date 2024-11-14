import { NestFactory, Reflector } from '@nestjs/core';
import App from './app';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  await new App(app)
    .configureMiddleware()
    .configureInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .configurePipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidUnknownValues: false,
      })
    )
    .init();
}

bootstrap();
