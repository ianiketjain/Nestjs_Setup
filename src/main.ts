import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  // Load environment variables
  config();
  
  if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error('JWT_ACCESS_TOKEN_SECRET is not set in environment variables');
  }

  const port = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(new AuthMiddleware().use);
  await app.listen(port);

  console.log(`Server is running on: http://localhost:${port}`);
}

bootstrap();
