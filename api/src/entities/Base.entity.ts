import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseRelationEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}

export class BaseUpdateRelationEntity extends BaseRelationEntity {
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}

class BaseMasterEntity extends BaseRelationEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
}

export class BaseUpdateMasterEntity extends BaseMasterEntity {
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}

export class BaseDeleteMasterEntity extends BaseUpdateMasterEntity {
  @Column({
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
    default: null,
  })
  deleted_at: Date | null;
}
