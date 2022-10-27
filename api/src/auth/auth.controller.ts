import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Response,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServive: AuthService) {}
  @Get()
  getAll() {
    return 'hellowolrd';
  }

  @Get('/callback/kakao')
  async login(@Query() query: any, @Response() res): Promise<any> {
    try {
      //   const { code, url } = body;
      //   if (!(code || url))
      //     return res.send('로그인 정보가 없습니다.').status(403);
      console.log(query.code);
      res.send('로그인 정보가 없습니다.');
      const social = await this.authServive.kakaologin(query.code);
    } catch (err) {
      console.log(err);
    }
  }
}
