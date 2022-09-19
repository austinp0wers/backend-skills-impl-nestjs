import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { mainCategory } from '../common/enum/categoryType.enum';
import { LocationEntity } from './location.entity';
// import { UserEntity } from './user.entity';

@Entity('shop')
@Unique(['shop_id'])
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  shop_id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar' }) description: string;

  @Column({ type: 'enum', enum: mainCategory }) category: string;

  @Column({ type: 'boolean', nullable: false, default: true }) visible: boolean;

  @OneToOne((type) => LocationEntity, (location) => location.location_id)
  @JoinColumn({ name: 'location_id' })
  location: string;

  @Column({ type: 'varchar', nullable: false }) price: string;

  @CreateDateColumn() createdOn?: Date;

  @CreateDateColumn() updatedOn?: Date;
}
