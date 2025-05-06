import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('main');
  //const app = await NestFactory.create(GatewayModule);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix("gateway");

  const config = new DocumentBuilder()
    .setTitle('gateway')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addTag('gateway')
    .build();

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  const documentFactory = () => SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, documentFactory);

  const port = configService.get<number>('port', 3000);
  await app.listen(port);
  
  //await app.listen(process.env.PORT ?? 3000);

  logger.log(
    `app ready to listen  in PORT - ${port}\n`,
    `While the application is running, open your browser and navigate to\n http://localhost:${port}/api. You should see the Swagger UI.\n`
  );
}
bootstrap();
