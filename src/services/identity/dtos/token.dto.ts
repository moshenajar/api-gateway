import { IsString, IsUUID } from 'class-validator';

export class TokenDto {
    @IsString()
    accessToken: string;
  @IsUUID()
  refreshToken: string;
  @IsUUID()
  userId:string;

}