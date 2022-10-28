import { AuthService } from './auth.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get()
  getAll() {
    return 'hellowolrd';
  }
  // @Get('/callback/kakao')
  // async login(@Query() query: any, @Response() res): Promise<any> {
  //   try {
  //     if (!query) return res.send('로그인 정보가 없습니다.').status(403);
  //     const social = await this.authService.kakaoLogin(query.code);
  //   } catch (err) {
  //     res.send(err);
  //   }
  // }
  @Post()
  // async logins(@Body() data: any, @Res() res: string): Promise<any> {
  //   const { access_token, social_type } = data;
  //   try {
  //     let profile: any;
  //     if (social_type === 'kakao')
  //       profile = await this.authService.kakao(access_token);
  //     // const userInfo = await this.userService.getUser(profile.email);
  //     // userInfo ? userInfo : await this.userService.createUser(profile);
  //   } catch (err) {
  //     return err;
  //   }
  // }
  async login(@Res() res: Response, @Body() data) {
    const userSearch = await this.authService.getUser(data.email);
    if (!userSearch) return res.send('회원 정보가 없습니다.');
    const success = await this.authService.logintest(data.email);
    return res.send(success);
  }
}
