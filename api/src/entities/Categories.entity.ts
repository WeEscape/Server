import { Column, Entity } from 'typeorm';
import { BaseUpdateMasterEntity } from './Base.entity';

@Entity('categories')
export class CategoriesEntity extends BaseUpdateMasterEntity {
  @Column({ type: 'varchar', name: 'name', length: 30 })
  name: string;

  @Column({ type: 'int', name: 'place_id' })
  place_id: number;
}
