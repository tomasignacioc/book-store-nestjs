import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // this means if I want to access an endpoint it should be this way: /api/endpointName

  await app.listen(AppModule.port);
}
bootstrap();
