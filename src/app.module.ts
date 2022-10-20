import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AppService } from './app.service';

@Module({
  imports: [UserModule, TaskModule],
  providers: [AppService],
})
export class AppModule {}
