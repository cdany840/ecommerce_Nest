import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'https://ecommerce-a16.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.enableCors(corsOptions);


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