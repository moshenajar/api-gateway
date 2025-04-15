import { Module } from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';
import { IdentityService } from 'src/services/identity/identity.service';
import { AuthController } from './auth.controller';
import { ProductsController } from './products.controller';

@Module({
  imports: [],
  controllers: [AuthController, ProductsController],
  providers: [ProductsService,IdentityService],
})
export class GatewayModule {}
