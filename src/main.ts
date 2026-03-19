import 'dotenv/config';

import session from 'express-session';
import passport from 'passport';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import morgan from 'morgan';

import constants from './contants';
const { SWAGGER, Global } = constants;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(morgan('dev'));

  // 🔥 TRUST PROXY (IMPORTANT for nginx + cookies)
  app.set('trust proxy', 1);

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'super-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true, // 🔥 MUST be true (HTTPS)
        httpOnly: true,
        sameSite: 'none', // 🔥 REQUIRED for Microsoft redirect
      },
    }),
  );

  // 🔥 PASSPORT INIT
  app.use(passport.initialize());
  app.use(passport.session());

  // enable global validation for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  // Global Prefix
  app.setGlobalPrefix(Global.PREFIX);

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle(SWAGGER.TITLE)
    .setDescription(SWAGGER.DESCRIPTION)
    .setVersion(SWAGGER.VERSION)
    .addServer(SWAGGER.SERVER_URL)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${Global.PREFIX}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true, // keeps JWT token after refresh
    },
  });

  await app.listen(process.env.PORT ?? 4004, '127.0.0.1');
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
}
bootstrap();
