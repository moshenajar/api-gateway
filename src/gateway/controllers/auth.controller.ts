import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { IdentityService } from 'src/services/identity/identity.service';
import { LoginDto } from 'src/services/identity/dtos/login.dto';
import { AuthCredentialsDto } from 'src/services/identity/dtos/auth.credentials.dto';
import { RefreshTokenDto } from 'src/services/identity/dtos/refresh-tokens.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ChangePasswordDto } from 'src/services/identity/dtos/change-password.dto';
import { User } from 'src/guards/user.entity';
import { GetUser } from 'src/guards/get-user.decorator';
import { ForgotPasswordDto } from 'src/services/identity/dtos/forgot-password.dto';
import { GetOtp } from 'src/guards/get-otp.decorator';
import { ForgotPasswordOtpDto } from 'src/services/identity/dtos/forgot-password-otp.dto';
import { ResetPasswordDto } from 'src/services/identity/dtos/reset-password.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthRefreshTokenGuard } from 'src/guards/auth.refreshtoken.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private identityService: IdentityService,
  ) { }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.identityService.signIn(loginDto)
  }

  @Post('signup')
  @ApiBody({ type: AuthCredentialsDto })
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.identityService.signUp(authCredentialsDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('changePassword')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser() user: User
  ) {
    return this.identityService.changePassword(
      user.userId,
      changePasswordDto
    );
  }


  /* 
  * To reset your password, you need to perform several steps:
  *   1) A screen to enter your username or email
  *   2) After clicking the Send button, [forgot-password-otp]you will receive a token and send OTP
  *   3) The token contains the encrypted OTP code and the username or email
  *   5) After entering the OTP, the token (only with accessToken) and the OTP code that you entered are sent to the server
  *   6) [forgot-password]A verification check is performed
  *   7) If verified - a temporary password valid for 10 minutes is sent to your email
  */

  /**
  * request:
  *   userName
  *   phone
  * response:
  * */

  @Post('forgotPasswordOtp')
  async forgotPasswordOtp(
    @Body() forgotPasswordOtpDto: ForgotPasswordOtpDto,
  ) {
    //1) check if user and phone valid
    //2) send OTP and return Token only for "forget password"
    return this.identityService.forgotPasswordOtp(forgotPasswordOtpDto)
  }


  /**
  * request:
  *   token
  *   otp
  * response:
  * */
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('forgotPassword')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @GetUser() user: User,
    @GetOtp() originalOtp: string,
  ) {

    forgotPasswordDto.userId = user.userId;
    forgotPasswordDto.originalOtp = originalOtp;
    return this.identityService.forgotPassword(forgotPasswordDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('resetPassword')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.identityService.resetPassword(resetPasswordDto);
  }


  /*

1. Token Expiry
- Verify that the refresh token has not expired.
- If expired, prompt the user to reauthenticate.
2. Token Revocation
- Check if the token has been revoked (e.g., user logged out or changed credentials).
- Maintain a blacklist or database flag for revoked tokens.
3. Token Integrity
- Ensure the UUID is correctly formatted and matches the stored value.
- If using a hashed UUID, verify it against the stored hash.
4. User Association
- Confirm the token is linked to the correct user.
- Prevent token reuse across different accounts.
5. Secure Storage
- Ensure the token is stored securely (e.g., httpOnly cookies or encrypted database).
- Avoid exposing it in client-side storage like localStorage.
6. Rate Limiting
- Implement rate limits to prevent abuse (e.g., multiple refresh attempts in a short time).

  */
  @ApiBearerAuth('access-token')
  @UseGuards(AuthRefreshTokenGuard)
  @Post('refreshToken')
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
    @GetUser() user: User,
  ) {
    return this.identityService.refreshToken(user);
  }

  /*@Post('validateToken')
  async validateToken(@Body() token: TokenDto) {
    return await this.identityService.validateToken(token.accessToken);
  }*/

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @Post('test')
  async test(
    @GetUser() user: User,
  ) {
    console.log(user);
  }
}
