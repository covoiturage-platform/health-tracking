import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import redoc from 'redoc-express';

export function setupRedoc(
  app: Awaited<ReturnType<typeof NestFactory.create<NestExpressApplication>>>,
) {
  const redocOptions = {
    title: 'Health Tracking API',
    version: '1.0',
    specUrl: '/swagger-json',
    theme: {
      colors: {
        primary: {
          main: '#dd5522',
        },
      },
      typography: {
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
      },
    },
  };

  app.use(
    '/docs',
    redoc({
      title: redocOptions.title,
      specUrl: redocOptions.specUrl,
    }),
  );
}