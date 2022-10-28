import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    UserModule,
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
    TasksModule,
  ],
})
export class AppModule {}
