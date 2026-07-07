import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global settings
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*', // Customize this for production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Documentation configuration
  const config = new DocumentBuilder()
    .setTitle('Forscha Labs API')
    .setDescription('Backend Business Growth OS API system supporting CRM, AI Reviews, GBP connections, QR generation, Invoices, and White Labelling.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Forscha Labs API is running on: http://localhost:${port}/api`);
  console.log(`📄 Swagger documentation is active at: http://localhost:${port}/docs`);
}
bootstrap();
