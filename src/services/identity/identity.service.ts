import { HttpStatus, Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { LoginDto } from "./dtos/login.dto";
import { AuthCredentialsDto } from "./dtos/auth.credentials.dto";
import { RefreshTokenDto } from "./dtos/refresh-tokens.dto";
import { ChangePasswordDto } from "./dtos/change-password.dto";
import { map, Observable, of } from "rxjs";
import { ApiResponseDto } from "src/utils/api-response";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { ForgotPasswordOtpDto } from "./dtos/forgot-password-otp.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { User } from "src/guards/user.entity";
import { UtilsService } from "src/utils/utils-service.ts";




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

    async refreshToken(refreshTokenDto: RefreshTokenDto) {
        return this.client.send('refreshToken', refreshTokenDto.refreshToken);
    }

    async changePassword(
        userId: string,
        changePasswordDto: ChangePasswordDto
    ) {
        return this.client.send('changePassword', {userId, changePasswordDto});
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
            //return "moshe-identity.service-validationToken";
        }
       
    }

    async forgotPasswordOtp(forgotPasswordOtpDto: ForgotPasswordOtpDto){
        return this.client.send('forgotPasswordOtp', {forgotPasswordOtpDto});
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto){
            return this.client.send('forgotPassword', {forgotPasswordDto});
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto){
        return this.client.send('resetPassword', {resetPasswordDto});
    }

    async getUserByUserId(userId: string){
        return this.client.send('getUserByUserId', {userId});
    }
       /* const tmpUser = this.client.send('getUserByUserId', {userId}).subscribe({
            next: (response) => {return of(response)},// console.log('Response:', response),
            error: (err) => console.error('Error:', err),
            complete: () => console.log('Completed'),
          });;
        let user: User = null;
        if(tmpUser)
        {
           
        }*/
        /*const user: User = {
            userId: '1',
            username: 'John Doe',
            password: 'john.doe@example.com',
          };
          
          return of(user); // Creates an Observable that emits the User object
       /* this.client.send('getUserByUserId', {userId})
        .subscribe({
            next: (response) => console.log('Response:', response),
            error: (err) => console.error('Error:', err),
            complete: () => console.log('Completed'),
          });;*/
    //}

    /*async test(hi: string){
        return this.test(hi);
    }

    async test1(hi: string){
        return await this.client.send('test', {hi});
    }*/

}