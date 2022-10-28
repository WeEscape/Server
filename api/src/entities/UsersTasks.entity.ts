import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseUpdateRelationEntity } from './Base.entity';

@Entity('users_tasks')
export class UsersTasksEntity extends BaseUpdateRelationEntity {
  @PrimaryColumn({ type: 'int', name: 'user_id' })
  user_id: number;

  @PrimaryColumn({ type: 'int', name: 'task_id' })
  task_id: number;

  @Column({ type: 'tinyint', name: 'is_end', default: 0 })
  is_end: number;
}
