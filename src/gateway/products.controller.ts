import { Controller, Get } from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService : ProductsService,
  ) { }

  @Get('GetAllProducts')
  async GetAllProducts() {
    return this.productsService.GetAllProducts()
  }


}
