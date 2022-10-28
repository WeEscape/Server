import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    TaskModule,
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [AppService],
})
export class AppModule {}
