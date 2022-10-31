import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/user/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.RDBMS_HOST,
  port: 3306,
  username: process.env.RDBMS_USER,
  password: process.env.RDBMS_PASSWORD,
  database: process.env.RDBMS_DATABASE,
  entities: [`${__dirname}/./entities/**.entity.{ts,js}`],
  synchronize: false, // 스키마 생성
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};

export = config;
