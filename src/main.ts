import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('port')
  
  app.setGlobalPrefix('api/v2') // Prefijo global para las rutas

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(PORT);
  console.log(`App Runnig on port ${PORT}`)
}
bootstrap();
