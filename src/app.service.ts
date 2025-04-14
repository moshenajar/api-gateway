import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { Product } from './schemas/product.schema';

@Injectable()
export class AppService {
constructor(
  @Inject('API-PRODUCT') private readonly clientApiProduct: ClientProxy,
){}

  findAll() {
    const startTs = Date.now();
    const pattern = { cmd: 'getAllProducts' };
    const payload = {};
    /*return this.clientApiProduct
    .send<Product[]>(pattern, payload)
    .toPromise()
        .then(response => response.flatMap(element => element));*/

      return  this.clientApiProduct.send<Product[]>(pattern, payload).subscribe(
        result => result.flatMap(element => element)
      );

  }

  getHello(): string {
    return 'Hello World!';
  }
}
