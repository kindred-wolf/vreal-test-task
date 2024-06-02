import { NestFactory } from '@nestjs/core'
import { AppModule } from './AppModule'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Documentation for VReal test task')
    .setVersion('1.0')
    .addTag('blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000)
}
bootstrap()
