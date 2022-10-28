import { RepeatCycle } from 'src/entities/Tasks.entity';

export class CreateTaskDto {
  title: string;
  category_id: number;
  repeat_cycle?: RepeatCycle;
  memo?: string;
  notice_available?: number;
  end_repeat_at?: Date;
  excute_at?: Date;
  excure_user_id: number;
}
