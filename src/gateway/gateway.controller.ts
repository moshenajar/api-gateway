import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Product } from '../schemas/product.schema';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MathService } from 'src/math/math.service';
import { ProductsService } from 'src/products/products.service';

@Controller('gateway')
export class GatewayController {
  constructor(
    private mathService : MathService,
    private productsService : ProductsService,
  ) { }

  @Post('Sum')
  async sumNumbers(@Body('data') data: Array<number>) {
    //this.logger.log('Http request to sum ' + data.toString()
    return this.mathService.SumNumbers(data)
  }

  @Post('Sum1')
  async sumNumbers1(@Body('data') data: Array<number>) {
    return this.productsService.SumNumbers(data)
  }

  @Get('GetAllProducts')
  async GetAllProducts() {
    return this.productsService.GetAllProducts()
  }


}
