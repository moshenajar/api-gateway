import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway/gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix("gateway");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
