import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { LoginDto } from "./dtos/login.dto";




@Injectable()
export class IdentityService {
    private client: ClientProxy
    
    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8123
            }
        })
    }

    public SumNumbers(data: Array<number>) {
        return this.client.send<number>('sum', data)
    }

    async signIn(loginDto: LoginDto) {
        return this.client.send('login',loginDto);
    } 

    


}