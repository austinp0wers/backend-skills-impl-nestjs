import { mainCategory } from './../common/enum/categoryType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('order')
@Unique(['order_id'])
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column({ type: 'enum', enum: mainCategory }) category: string;

  @CreateDateColumn() createdAt?: Date;
}
