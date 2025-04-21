import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { IdentityService } from 'src/services/identity/identity.service';
import { LoginDto } from 'src/services/identity/dtos/login.dto';
import { AuthCredentialsDto } from 'src/services/identity/dtos/auth.credentials.dto';
import { RefreshTokenDto } from 'src/services/identity/dtos/refresh-tokens.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ChangePasswordDto } from 'src/services/identity/dtos/change-password.dto';
import { User } from 'src/guards/user.entity';
import { GetUserId } from 'src/guards/get-user.decorator';
import { TokenDto } from 'src/services/identity/dtos/token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private identityService : IdentityService,
  ) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.identityService.signIn(loginDto)
  }

  @Post('signup')
  async signUp(authCredentialsDto: AuthCredentialsDto) {
      return this.identityService.signUp(authCredentialsDto);
  }

  @Post('refresh')
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
      return this.identityService.refreshTokens(refreshTokenDto);
  }

  @Post('validateToken')
  async validateToken(@Body() token: TokenDto) {
    return await this.identityService.validateToken(token.accessToken);
  }


  @UseGuards(AuthGuard)
  @Post('test')
  async test(){
    return true;
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  async changePassword(
      @Body() changePasswordDto: ChangePasswordDto,
      @GetUserId() userId: string
  ) {
      return this.identityService.changePassword(
        userId,
        changePasswordDto
      );
  }

}
