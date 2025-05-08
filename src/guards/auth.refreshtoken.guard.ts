import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, 
    ForbiddenException,
    Inject,
    HttpCode,
    HttpStatus,} from '@nestjs/common';
import { IdentityService } from 'src/services/identity/identity.service';
//import { HttpService } from 'src/services/http/http.service';
import { validateHeaderValue } from 'http';
import { ApiResponseDto } from 'src/utils/api-response';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from './user.entity';
    
      
      @Injectable()
      export class AuthRefreshTokenGuard implements CanActivate {
        constructor(
          private identityService : IdentityService,
          //@Inject('CustomHttpService') private readonly httpService: HttpService,
        ) {}
      
        async canActivate(context: ExecutionContext): Promise<boolean> {
          try {
            const request = context.switchToHttp().getRequest();
            const { authorization }: any = request.headers;
            if (!authorization || authorization.trim() === '') {
              throw new UnauthorizedException('Please provide token');
            }
            const authToken = authorization.replace(/bearer/gim, '').trim();

            const validateTokenResponse:ApiResponseDto<User> = await firstValueFrom(await this.identityService.validateRefreshToken(authToken));

    
            if(validateTokenResponse.statusCode == HttpStatus.UNAUTHORIZED)
              return false
            
            request.user = validateTokenResponse.data;
            return true;
          } catch (error) {
            console.log('auth error - ', error.message);
            throw new ForbiddenException(error.message || 'session expired! Please sign In');
          }
        }
      }