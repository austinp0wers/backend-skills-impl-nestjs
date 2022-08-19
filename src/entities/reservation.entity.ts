import { ShopEntity } from './shop.entity';
import { mainCategory } from '../common/enum/categoryType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ type: 'varchar' }) user_id: string;

  @Column({ type: 'varchar', default: 'pending' }) status: string;

  @Column({ type: 'datetime', nullable: false }) reserve_date: Date;

  @ManyToOne((type) => ShopEntity, (shop) => shop.shop_id)
  @JoinColumn({ name: 'shop_id' })
  shop_id: ShopEntity;

  @CreateDateColumn()
  createdAt?: Date;
}
