import { Module } from '@nestjs/common';
import { ServiceService } from './service/tesk.service';

@Module({
  providers: [ServiceService],
})
export class TaskModule {}
