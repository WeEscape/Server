import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.RDBMS_HOST,
      port: 3306,
      username: process.env.RDBMS_USER,
      password: process.env.RDBMS_PASSWORD,
      database: process.env.RDBMS_DATABASE,
      entities: [`${__dirname}/./entities/**.entity.{ts,js}`],
      synchronize: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
