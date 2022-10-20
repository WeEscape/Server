import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function dobbyServer() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const port = 8080;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  });
  await app.listen(8080);
  logger.log(`server is running, on port ${port}`);
}
dobbyServer();
