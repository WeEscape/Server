import { IsNotEmpty, IsString } from 'class-validator';

export class AuthInfoDto {
  @IsString()
  @IsNotEmpty()
  access_token: string;
  social_type: string;
}
