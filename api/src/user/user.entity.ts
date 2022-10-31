import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'DobbyTestA', name: 'testuser' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 30 })
  email: string;

  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @Column('varchar', { name: 'profile_url', length: 255 })
  profile_url: string;

  @Column('varchar', { name: 'profile_color', length: 10 })
  profile_color: string;

  @Column('varchar', { name: 'social_type', length: 10 })
  social_type: string;
}
