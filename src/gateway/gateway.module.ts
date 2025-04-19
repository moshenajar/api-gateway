import { Module } from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';
import { IdentityService } from 'src/services/identity/identity.service';
import { AuthController } from './auth.controller';
import { ProductsController } from './products.controller';
import { HttpModule } from 'src/services/http/http.module';

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
  providers: [ProductsService,IdentityService],
})
export class GatewayModule {}
