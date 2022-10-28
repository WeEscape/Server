import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';

@Module({
  imports: [
    UserModule,
    TaskModule,
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
  ],
  providers: [AppService],
})
export class AppModule {}
