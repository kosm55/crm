import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfig } from './configs/configs.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  const config = new DocumentBuilder()
    .setTitle('CRM system Api')
    .setDescription('user management')
    .setVersion('1.0.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 1,
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Server running on http://${appConfig.host}:${appConfig.port}`);
    console.log(
      `Swagger running on http://${appConfig.host}:${appConfig.port}/docs`,
    );
  });
}
void bootstrap();
