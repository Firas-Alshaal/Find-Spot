import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      enableDebugMessages: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useStaticAssets(path.join(__dirname, '/../public'));
  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   index: false,
  //   prefix: '/public',
  // });

  // CORS
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
