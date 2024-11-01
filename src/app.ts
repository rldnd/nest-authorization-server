import type { INestApplication, NestInterceptor, PipeTransform } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class App {
  #configService = new ConfigService();

  constructor(private readonly app: INestApplication) {}

  async init() {
    this.#configureSwagger();
    this.#enableCors({ origin: true, credentials: true });

    await this.app.listen(this.#configService.get('PORT') || 8000, () => {
      console.info(`Server Started on http://localhost:${this.#configService.get('PORT')} 🔥`);
    });
  }

  configureMiddleware(...middlewares: any[]) {
    this.app.use(...middlewares);
    return this;
  }

  configurePipes(...pipes: PipeTransform<any>[]) {
    this.app.useGlobalPipes(...pipes);
    return this;
  }

  configureInterceptors(...interceptors: NestInterceptor[]) {
    this.app.useGlobalInterceptors(...interceptors);
    return this;
  }

  #configureSwagger() {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Arain Authorization Server API')
      .setDescription('권한 및 액션 버튼 확인을 위한 프로토타입 서버입니다.')
      .setVersion('0.0.1')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          name: 'JWT',
          in: 'header',
        },
        'access-token'
      )
      .build();

    const document = SwaggerModule.createDocument(this.app, swaggerConfig);

    SwaggerModule.setup('api-docs', this.app, document);
  }

  #enableCors(options: Parameters<INestApplication['enableCors']>[0]) {
    this.app.enableCors(options);
  }
}

export default App;
