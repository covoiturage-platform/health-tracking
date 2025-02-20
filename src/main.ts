import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { setupRedoc } from './utils/redoc.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });

  const config = new DocumentBuilder()
    .setTitle('Health tracking API')
    .setDescription('The health tracking API description')
    .setVersion('1.0')
    .addTag('health')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  setupRedoc(app);

  await app.listen(process.env.PORT ?? 5000, () => {
    console.log("-----------------------------------------------------");
    console.log(`Server is running on http://localhost:${process.env.PORT ?? 5000}`);
    console.log("-----------------------------------------------------");
    console.log(`Swagger documentation is available at http://localhost:${process.env.PORT ?? 5000}/swagger`);
    console.log("-----------------------------------------------------");
    console.log(`Redoc documentation is available at http://localhost:${process.env.PORT ?? 5000}/docs`);
    console.log("-----------------------------------------------------");
    console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
    console.log("-----------------------------------------------------");
  });
}
bootstrap();