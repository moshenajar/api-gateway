import { Module} from '@nestjs/common';
import { AppService } from './app.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
    imports: [GatewayModule],
    controllers: [],
    providers: [AppService],
  })
  export class AppModule {}