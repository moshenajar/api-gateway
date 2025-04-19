import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { LoginDto } from "./dtos/login.dto";
import { AuthCredentialsDto } from "./dtos/auth.credentials.dto";
import { RefreshTokenDto } from "./dtos/refresh-tokens.dto";
import { ChangePasswordDto } from "./dtos/change-password.dto";




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
        return this.client.send('login', loginDto);
    } 

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return this.client.send('signup', authCredentialsDto);
    }

    async refreshTokens(refreshTokenDto: RefreshTokenDto) {
        return this.client.send('refreshTokens', refreshTokenDto.refreshToken);
    }

    async changePassword(
        userId: any,
        oldPassword: string,
        newPassword: string,
    ) {
        return this.client.send('changePassword', {userId, oldPassword, newPassword});
    }

    async validateToken(
        jwt: string
    ){
        try 
        {
            return this.client.send('validateToken', jwt);
        } 
    catch (e) 
        {
            //Logger.error(e.message);
            return "moshe-identity.service-validationToken";
        }
       
    }

}