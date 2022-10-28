import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/user/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db-c7uqk.pub-cdb.ntruss.com',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users],
  synchronize: false, // 한번 true한 뒤로는 무조건 false
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = config;
