import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  async getTasksByUserId(@Query('user_id', ParseIntPipe) user_id: number) {
    return await this.tasksService.getTasksByUserId(user_id);
  }

  @Get('/:id')
  async getTaskId(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getTaskById(id);
  }
}
