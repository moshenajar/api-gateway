import { Body, Controller, Post } from '@nestjs/common';
import { IdentityService } from 'src/services/identity/identity.service';
import { LoginDto } from 'src/services/identity/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private identityService : IdentityService,
  ) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.identityService.signIn(loginDto)
  }

}
