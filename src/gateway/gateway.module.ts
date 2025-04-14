import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
//import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MathService } from 'src/math/math.service';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [
    /*ClientsModule.register([
      {
        name: 'PRODUCT_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 3001,
        }
      }
    ])*/
    /*ClientsModule.register([
      { name: 'USER_SERVICE', transport: Transport.TCP },
      { name: 'ORDER_SERVICE', transport: Transport.TCP },
    ]),*/
  ],
  controllers: [GatewayController],
  providers: [MathService, ProductsService],
})
export class GatewayModule {}
