import { ReservationEntity } from './reservation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { mainCategory } from '../common/enum/categoryType.enum';
import { UserEntity } from './user.entity';

@Entity('shop')
@Unique(['post_id'])
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  post_id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar' }) description: string;

  @Column({ type: 'enum', enum: mainCategory }) category: string;

  @Column({ type: 'boolean', nullable: false, default: true }) visible: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user_id: UserEntity;

  @CreateDateColumn() createdOn?: Date;

  @CreateDateColumn() updatedOn?: Date;
}
