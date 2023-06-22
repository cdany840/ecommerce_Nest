import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();


  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use('/img', express.static(join(__dirname, '..', 'img')));
  app.use('/img-category', express.static(join(__dirname, '..', 'img-category')));

  /* app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  ); */

  await app.listen( process.env.PORT || 3000 );
}

bootstrap();