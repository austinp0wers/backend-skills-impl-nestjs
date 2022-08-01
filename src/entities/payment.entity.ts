import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('payment_logs')
@Unique(['payment_id'])
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string;

  @Column({ type: 'varchar' }) order_id: string;

  @Column({ type: 'varchar' }) location: string;
  @Column({ type: 'varchar' }) user_id: string;
  @Column({ type: 'varchar' }) status: string;
  @CreateDateColumn()
  createdAt?: Date;
}
