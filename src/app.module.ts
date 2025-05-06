import { Module} from '@nestjs/common';
import { GatewayModule } from './gateway/gateway.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
      }),
      GatewayModule],
    controllers: [],
    providers: [],
  })
  export class AppModule {}