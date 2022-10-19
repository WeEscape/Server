import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { TaskModule } from './task.module';

@Module({
  imports: [UserModule, TaskModule],
})
export class AppModule {}
