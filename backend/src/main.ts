import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load .env from backend folder first, then fallback to repository root .env
dotenv.config();
// If key like PORT is still undefined, try loading repo root .env
if (!process.env.PORT) {
  dotenv.config({ path: join(__dirname, '..', '..', '.env') });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Permitir localhost:5173/5174 en desarrollo si FRONTEND_URL no está seteado
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5174',
  ].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/api`);
}
bootstrap();
