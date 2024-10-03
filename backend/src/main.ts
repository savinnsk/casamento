import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as serveStatic from 'serve-static';

async function bootstrap() {
 // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir arquivos estáticos
  app.use(serveStatic(join(__dirname, '..', 'front')));

  // Qualquer outra configuração que você precise
  app.enableCors(); // Se precisar


  const config = new DocumentBuilder()
    .setTitle('API FOR MARRIEGE')
    .addBearerAuth()
    .setDescription('API FOR MARRIEGE')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3002, '0.0.0.0');
  
}
bootstrap();
