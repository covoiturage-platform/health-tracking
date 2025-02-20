import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import redoc from 'redoc-express';

export function setupRedoc(
  app: Awaited<ReturnType<typeof NestFactory.create<NestExpressApplication>>>,
) {
  const redocOptions = {
    title: 'Health tracking API',
    version: '1.0',
    specUrl: '/swagger-json',
  };

  app.use(
    '/docs',
    redoc({
      title: redocOptions.title,
      specUrl: redocOptions.specUrl,
    }),
  );
}