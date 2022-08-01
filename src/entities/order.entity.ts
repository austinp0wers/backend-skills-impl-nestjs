import { mainCategory } from './../common/enum/categoryType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('order_logs')
@Unique(['order_id'])
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column({ type: 'enum', enum: mainCategory }) category: string;
  @Column({ type: 'varchar' }) location: string;
  @Column({ type: 'varchar' }) user_id: string;
  @Column({ type: 'varchar' }) status: string;
  @CreateDateColumn()
  createdAt?: Date;
}
