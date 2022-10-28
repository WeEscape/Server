import { Column, Entity, Index } from 'typeorm';
import { BaseUpdateMasterEntity } from './Base.entity';

@Entity('dormants_users')
export class DormantsUsersEntity extends BaseUpdateMasterEntity {
  @Index('EMAIL_UNIQUE', { unique: true })
  @Column({ type: 'varchar', name: 'email', length: 30 })
  email: string;

  @Column({ type: 'varchar', name: 'name', length: 30 })
  name: string;

  @Column({
    type: 'varchar',
    name: 'profile_url',
    length: 255,
    nullable: true,
    default: null,
  })
  profile_url: string | null;

  @Column({
    type: 'varchar',
    name: 'profile_color',
    length: 10,
  })
  profile_color: string;

  @Column({
    type: 'varchar',
    name: 'social_type',
    length: 10,
  })
  social_type: string;

  @Column({
    type: 'tinyint',
    name: 'is_connect',
    default: 0,
  })
  is_connect: number;

  @Column({
    type: 'datetime',
    name: 'last_connected_at',
    precision: 6,
    nullable: true,
    default: null,
  })
  last_connected_at: Date | null;
}
