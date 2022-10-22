import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Helmet from 'helmet';
import { config } from './config';
async function dobbyServer() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const port = config.server.port;

  app.use(Helmet());
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
  await app.listen(port);
  logger.log(`server is running, on port ${port}`);
}
dobbyServer();
