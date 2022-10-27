import { Column, Entity } from 'typeorm';
import { BaseUpdateMasterEntity } from './Base.entity';

export type RepeatCycle = '1D' | '1W' | '1D';

@Entity('tasks')
export class TasksEntity extends BaseUpdateMasterEntity {
  @Column({ type: 'int', name: 'category_id' })
  category_id: number;

  @Column({ type: 'int', name: 'create_user_id' })
  create_user_id: number;

  @Column({
    type: 'enum',
    name: 'repeat_cycle',
    enum: ['1D', '1W', '1M'],
    nullable: true,
    default: null,
  })
  repeat_cycle: RepeatCycle | null;

  @Column({ type: 'text', name: 'memo', nullable: true, default: null })
  memo: string | null;

  @Column({ type: 'tinyint', name: 'notice_available', default: 1 })
  notice_available: number;

  @Column({ type: 'datetime', name: 'ended_at', nullable: true, default: null })
  end_repeat_at: Date | null;

  @Column({ type: 'datetime', name: 'excute_at' })
  excute_at: Date;

  @Column({
    type: 'int',
    name: 'previous_task_id',
    nullable: true,
    default: null,
  })
  previous_task_id: number | null;
}
