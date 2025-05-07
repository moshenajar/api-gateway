import { Module } from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';
import { IdentityService } from 'src/services/identity/identity.service';
import { AuthController } from './controllers/auth.controller';
import { ProductsController } from './controllers/products.controller';
import { HttpModule } from 'src/services/http/http.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    HttpModule.forFeature({
      serviceName: 'CustomHttpService',
      config: {
        baseURL: 'http://localhost:3012',
        enableLogging: true,
      },
    }),
  ],
  controllers: [AuthController, ProductsController],
  providers: [ProductsService, IdentityService],
})
export class GatewayModule { }
