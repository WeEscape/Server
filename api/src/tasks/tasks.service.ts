import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepeatCycle, TasksEntity } from 'src/entities/Tasks.entity';
import { UsersEntity } from 'src/entities/Users.entity';
import { UsersTasksEntity } from 'src/entities/UsersTasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create.task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  /** task 생성 */
  async createTask(
    user_id: number,
    createTaskDto: CreateTaskDto,
  ): Promise<void> {
    // 삭제하지 않은 user인지 판단

    // task를 부여받는 user가 존재하는지 판단

    const newTask = {
      category_id: createTaskDto.category_id,
      create_user_id: user_id,
      repeat_cycle: createTaskDto?.repeat_cycle || null,
      memo: createTaskDto?.memo || null,
      notice_available: createTaskDto?.notice_available ?? 1,
      end_repeat_at: createTaskDto?.end_repeat_at || null,
      excute_at: createTaskDto?.excute_at || new Date(),
    };

    // task 생성
    const newTaskId = (await this.tasksRepository.save(newTask)).id;

    // user에게 task 부여

    // 반복이 존재할 시 다음 task 생성 및 user에게 task 부여
    if (createTaskDto?.repeat_cycle) {
      await this.tasksRepository.save({
        ...newTask,
        excute_at: this.generateNextExcuteAt(
          createTaskDto.excute_at,
          createTaskDto.repeat_cycle,
        ),
        previous_task_id: newTaskId,
      });
    }
  }

  /** user id별 task 목록 조회 */
  async getTasksByUserId(user_id: number): Promise<unknown> {
    // user가 작성한 tasks 및 부여받은 tasks
    return await this.tasksRepository
      .createQueryBuilder('tasks')
      .select('tasks.*')
      .addSelect('GROUP_CONCAT(users.name)', 'user_names')
      .leftJoin(
        UsersTasksEntity,
        'users_tasks',
        'tasks.id = users_tasks.task_id',
      )
      .leftJoin(UsersEntity, 'users', 'users_tasks.user_id = users.id')
      .where(
        'tasks.create_user_id = :user_id OR users_tasks.user_id = :user_id',
        { user_id },
      )
      .groupBy('tasks.id')
      .getRawMany();
  }

  /** id별 task 조회 */
  async getTaskById(id: number): Promise<unknown> {
    const task = await this.tasksRepository
      .createQueryBuilder('tasks')
      .select('tasks.*')
      .addSelect('GROUP_CONCAT(users.name) AS user_names')
      .leftJoin(
        UsersTasksEntity,
        'users_tasks',
        'tasks.id = users_tasks.task_id',
      )
      .leftJoin(UsersEntity, 'users', 'users_tasks.user_id = users.id')
      .where('tasks.id = :id', { id })
      .groupBy('tasks.id')
      .getRawOne();

    if (!task) {
      throw new NotFoundException('task');
    }

    return task;
  }

  /** 다음 task 날짜 생성 */
  private generateNextExcuteAt(
    excute_at: Date,
    repeat_cycle: RepeatCycle,
  ): Date {
    let next_excute_at: Date;

    switch (repeat_cycle) {
      case '1D':
        next_excute_at = new Date(new Date().setDate(excute_at.getDate() + 1));
        break;
      case '1W':
        next_excute_at = new Date(new Date().setDate(excute_at.getDate() + 7));
        break;
      case '1M':
        next_excute_at = new Date(new Date().setDate(excute_at.getMonth() + 1));
        break;
      default:
        throw new BadRequestException('repeat_cycle');
    }

    return next_excute_at;
  }
}
