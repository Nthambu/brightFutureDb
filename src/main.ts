import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  try {

    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    // More permissive CORS for debugging - removed restrictions temporarily
    const isProduction = process.env.NODE_ENV === 'production';
    
    let corsOrigins;
    if (process.env.FRONTEND_URL) {
      // Use specified frontend URLs
      corsOrigins = process.env.FRONTEND_URL.split(',').map(url => url.trim());
    } else if (isProduction) {
      // Allowed frontend domains in production
      corsOrigins = [
        'https://bfef-frontend.onrender.com',
        /\.onrender\.com$/,  // Allow any Render subdomain
        /\.netlify\.app$/,   // Allow Netlify deployments  
        /\.vercel\.app$/,    // Allow Vercel deployments
      ];
    } else {
      // Development origins
      corsOrigins = [
        'http://localhost:3000', 
        'http://localhost:5173', 
        'http://localhost:4173',
        'http://localhost:8080'
      ];
    }

    console.log('CORS Origins configured:', corsOrigins);

    app.enableCors({
      origin: corsOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'Accept',
        'Origin',
        'X-Requested-With'
      ],
      exposedHeaders: ['Content-Length', 'Content-Type'],
      preflightContinue: false,
      optionsSuccessStatus: 200
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    
    console.log(`🚀 BFEF Kenya API running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`CORS configured for: ${JSON.stringify(corsOrigins, null, 2)}`);
    console.log('✅ API Ready - CORS should now allow frontend requests');
    
  } catch (error) {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap().catch((error) => {
  console.error('❌ Bootstrap failed:', error);
  process.exit(1);
});
