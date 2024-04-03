import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configureAuthSwaggerDocs } from './helpers/configure-auth-swagger-docs.helper';
import { configureSwaggerDocs } from './helpers/configure-swagger-docs.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  configureAuthSwaggerDocs(app, configService);
  configureSwaggerDocs(app, configService);
  await app.listen(port, '0.0.0.0');
  if (configService.get<string>('NODE_ENV') === 'dev') {
    Logger.debug(
      `${await app.getUrl()} - Environment: ${configService.get<string>(
        'NODE_ENV',
      )}`,
      'Environment',
    );

    Logger.debug(`${await app.getUrl()}/docs`, 'Swagger');
  }
}
bootstrap();
