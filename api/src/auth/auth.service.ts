import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  async kakaologin(code: string): Promise<any> {
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
      console.log(access_token);
      console.log(nickname, profile_image_url, email);
    } catch (err) {
      return err;
    }
  }
}
