import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { mainCategory } from '../common/enum/categoryType.enum';
// import { UserEntity } from './user.entity';

@Entity('shop')
@Unique(['shop_id'])
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  shop_id: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar' }) description: string;

  @Column({ type: 'enum', enum: mainCategory }) category: string;

  @Column({ type: 'boolean', nullable: false, default: true }) visible: boolean;

  @CreateDateColumn() createdOn?: Date;

  @CreateDateColumn() updatedOn?: Date;
}
