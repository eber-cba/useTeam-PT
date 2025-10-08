import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { join } from 'path';

// 🧩 Cargar variables desde /backend/.env
dotenv.config({ path: join(__dirname, '..', '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas (ej: /api/users)
  app.setGlobalPrefix('api');

  // Orígenes permitidos (CORS)
  const allowedOrigins = [
    process.env.FRONTEND_URL, // producción (Vercel)
    'http://localhost:5173', // desarrollo local
    'http://localhost:5174', // otra pestaña local opcional
  ].filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Puerto de escucha
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('✅ Allowed origins:', allowedOrigins);
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🌐 API base URL: http://localhost:${port}/api`);
}

bootstrap();
