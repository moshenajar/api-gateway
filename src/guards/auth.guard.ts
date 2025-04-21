import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, 
    ForbiddenException,
    Inject,
    HttpCode,
    HttpStatus,} from '@nestjs/common';
import { IdentityService } from 'src/services/identity/identity.service';
import { HttpService } from 'src/services/http/http.service';
import { validateHeaderValue } from 'http';
import { ApiResponseDto } from 'src/utils/api-response';
//import { AuthService } from './auth.service';
    
      
      @Injectable()
      export class AuthGuard implements CanActivate {
        constructor(
          private identityService : IdentityService,
          @Inject('CustomHttpService') private readonly httpService: HttpService,
        ) {}
      
        async canActivate(context: ExecutionContext): Promise<boolean> {
          try {
            const request = context.switchToHttp().getRequest();
            const { authorization }: any = request.headers;
            if (!authorization || authorization.trim() === '') {
              throw new UnauthorizedException('Please provide token');
            }
            const authToken = authorization.replace(/bearer/gim, '').trim();

            const message: String = 'dddd';

            
            let postBody = {
              accessToken: authToken,
            };

            const response = await this.httpService.post<ApiResponseDto<string>>('http://localhost:3000/gateway/auth/validateToken',
             
              postBody
              
              ,
            /*{
              headers: {
                'Authorization': 'Bearer ' + token,
              },
            }*/
            );

           /* const resp = await this.identityService.validateToken(
              //authToken
              "eyJhbGciOi1JIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYTllOTVhOC1lOGRmLTQxNTctOWE3MC1lNGE0ZDIzYjkxZTgiLCJpYXQiOjE3NDQ3NDk3NjgsImV4cCI6MTc0NDc4NTc2OH0.Mu7J4Jh4EYyvOX0aNZ8i_jYIUPcqDDbxmKEUiGO9tyl"
            ); */
            //const { body }: any = request.body;
            
            //request.user = resp;
            if(response.status == HttpStatus.UNAUTHORIZED)
              return false
            
            request.userId = response?.data?.data;
            return true;
          } catch (error) {
            console.log('auth error - ', error.message);
            throw new ForbiddenException(error.message || 'session expired! Please sign In');
          }
        }
      }