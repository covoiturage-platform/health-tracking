import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 5000,
    
    // This is the function that gets called when the app is ready to receive requests.
    () => {
      console.log("-----------------------------------------------------");
      console.log(`Server is running on http://localhost:${process.env.PORT ?? 5000}`);
      console.log("-----------------------------------------------------");
    }
  );
}
bootstrap();
