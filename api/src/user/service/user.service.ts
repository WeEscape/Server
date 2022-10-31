import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';

type Profile = {
  name: string;
  email: string;
  profile_url: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // async getUser(email: string) {
  //   const user = await this.usersRepository.findOne({
  //     where: { email },
  //   });
  //   return user;
  // }

  // async createUser(profile: Profile) {
  //   await this.usersRepository.save(profile);
  // }
}
