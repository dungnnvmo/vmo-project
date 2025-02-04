import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CommonLogger } from '@common/logger/common-logger';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { appConfig } from '@configs/configs.constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new CommonLogger('Main');
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['log', 'debug', 'error', 'verbose', 'warn'],
  });

  const options = new DocumentBuilder()
    .setTitle('HRM')
    .setDescription('HRM API description')
    .setVersion('1.0')
    .addTag('template')
    .addBearerAuth({ type: 'http', name: 'Authorization', in: 'header' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(appConfig.prefix, app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const port = appConfig.port;
  logger.log(`App is listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
