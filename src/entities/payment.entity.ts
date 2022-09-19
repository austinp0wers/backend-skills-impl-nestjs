import { UserEntity } from './user.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm';

@Entity('payment_logs')
@Unique(['payment_id'])
export class paymentEntity {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string;

  @Column({ type: 'varchar' }) order_id: string;

  @Column({ type: 'varchar' }) location: string;

  @ManyToOne((type) => UserEntity, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column({ type: 'varchar' }) status: string;
  @CreateDateColumn()
  createdAt?: Date;
}
