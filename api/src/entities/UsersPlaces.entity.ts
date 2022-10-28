import { Entity, PrimaryColumn } from 'typeorm';
import { BaseRelationEntity } from './Base.entity';

@Entity('users_places')
export class UsersPlacesEntity extends BaseRelationEntity {
  @PrimaryColumn({ type: 'int', name: 'user_id' })
  user_id: number;

  @PrimaryColumn({ type: 'int', name: 'place_id' })
  place_id: number;
}
