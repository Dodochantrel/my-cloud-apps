import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger(
    configService.get<string>('APPLICATION_NAME') as string,
  );

  const config = new DocumentBuilder()
  .setTitle('Cloud API')
  .setDescription('The Cloud API description')
  .setVersion('1.0')
  .addTag('cloud')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  const apiPort = configService.get<number>('APP_PORT', 3000);
  logger.log(`Starting listen on port ${apiPort}`);
  await app.listen(apiPort ?? 3000);
}
bootstrap();
