import { Users } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async kakaoLogin(code: string): Promise<any> {
    const redir = 'http://localhost:8080/auth/callback/kakao';
    const kakaourl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_KEY}&redirect_uri=${redir}&code=${code}`;

    try {
      const response = await axios.post(kakaourl);
      const { access_token } = response.data;
      const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const { nickname, profile_image_url } =
        userInfo.data.kakao_account.profile;
      const { email } = userInfo.data.kakao_account;
    } catch (err) {
      return err;
    }
  }

  // 토큰 발급 로직
  async createToken(email: any): Promise<any> {
    const payload = { email };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = await this.jwtService.sign(
      {},
      {
        expiresIn: '14d',
      },
    );
    return { accessToken, refreshToken };
  }

  async getUser(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });
    return user;
  }

  // 카카오 로그인 로직
  async kakao(token: string): Promise<any> {
    const kakaourl = 'https://kapi.kakao.com/v2/user/me';
    try {
      const userInfo = await axios.get(kakaourl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { nickname: name, profile_image_url: profile_url } =
        userInfo.data.kakao_account.profile;
      const { email } = userInfo.data.kakao_account;
      const accesstoken = await this.createToken(email);
      return { name, profile_url, email, accesstoken };
    } catch (err) {
      return err;
    }
  }

  // 로그인 토큰 테스트 로직
  async logintest(data: string) {
    try {
      return await this.createToken(data);
    } catch (err) {
      return err;
    }
  }
}
