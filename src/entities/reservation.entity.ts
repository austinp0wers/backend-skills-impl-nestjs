import { mainCategory } from '../common/enum/categoryType.enum';
import { PostEntity } from './post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('reservations')
@Unique(['reservation_id'])
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  reservation_id: string;

  @Column({ type: 'enum', enum: mainCategory, default: null }) category: string;
  @Column({ type: 'varchar', nullable: false }) shop_id: string;
  @Column({ type: 'varchar' }) user_id: string;
  @Column({ type: 'varchar', default: 'pending' }) status: string;

  @Column({ type: 'datetime', nullable: false }) date_only: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @ManyToOne(() => PostEntity, (post) => post.post_id)
  post_id: PostEntity;
}
