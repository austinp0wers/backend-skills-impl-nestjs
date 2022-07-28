import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { mainCategory } from '../common/enum/categoryType.enum';
@Entity('board')
@Unique(['board_id'])
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid') board_id: string;
  @Column({ type: 'varchar', nullable: false, unique: true }) title: string;
  @Column({ type: 'varchar', nullable: false }) content: string;

  // secondary key
  @Column({ type: 'varchar', nullable: false }) author: string;

  // Enum 으로 설정
  @Column({ type: 'enum', enum: mainCategory })
  category: string;

  @CreateDateColumn() createdOn?: Date;
  @CreateDateColumn() updatedOn?: Date;
}
