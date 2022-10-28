import { Column, Entity, Index } from 'typeorm';
import { BaseUpdateMasterEntity } from './Base.entity';

@Entity('places')
export class PlacesEntity extends BaseUpdateMasterEntity {
  @Index('INVITE_CODE_UNIQUE', { unique: true })
  @Column({ type: 'varchar', name: 'invite_code', length: 100 })
  invite_code: string;

  @Column({ type: 'varchar', name: 'name', length: 30 })
  name: string;
}
