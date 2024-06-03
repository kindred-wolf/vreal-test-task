import { ok } from 'assert'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './AppModule'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Documentation for VReal test task')
    .setVersion('1.0')
    .addTag('blog')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  ok(process.env.JWT_SIGN_SECRET, 'JWT_SIGN_SECRET env variable is not defined')
  ok(process.env.PORT, 'PORT env variable is not defined')

  await app.listen(process.env.PORT)
}
bootstrap()
