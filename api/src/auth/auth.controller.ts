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
      if (!query) return res.send('로그인 정보가 없습니다.').status(403);
      const social = await this.authServive.kakaologin(query.code);
    } catch (err) {
      res.send(err);
    }
  }
}
